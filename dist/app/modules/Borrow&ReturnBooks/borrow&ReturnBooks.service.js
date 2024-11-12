"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowServices = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const borrowBook = (bookId, memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma.book.findUnique({ where: { bookId } });
    if (!book || book.availableCopies <= 0) {
        throw new Error("Book is not available for borrowing");
    }
    const borrowRecord = yield prisma.borrowRecord.create({
        data: {
            bookId,
            memberId,
            borrowDate: new Date(),
        },
    });
    yield prisma.book.update({
        where: { bookId },
        data: { availableCopies: { decrement: 1 } },
    });
    return borrowRecord;
});
const returnBook = (borrowId) => __awaiter(void 0, void 0, void 0, function* () {
    // Start a transaction
    const [updatedBorrow, updatedBook] = yield prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        // Find the borrow record and ensure it includes the associated book
        const borrowRecord = yield prisma.borrowRecord.findUnique({
            where: { borrowId },
            include: { Book: true },
        });
        // Check if the borrow record exists and if the book has already been returned
        if (!borrowRecord || borrowRecord.returnDate) {
            throw new Error("Invalid borrow record or book already returned");
        }
        // Ensure bookId is available and valid
        const bookId = borrowRecord.bookId;
        if (!bookId) {
            throw new Error("No book associated with this borrow record");
        }
        // Update the borrow record with the return date
        const updatedBorrow = yield prisma.borrowRecord.update({
            where: { borrowId },
            data: {
                returnDate: new Date(),
            },
        });
        // Update the available copies of the book
        const updatedBook = yield prisma.book.update({
            where: { bookId },
            data: { availableCopies: { increment: 1 } }, // Increment available copies by 1
        });
        return [updatedBorrow, updatedBook];
    }));
    return {
        success: true,
        message: "Book returned successfully",
        data: { updatedBorrow, updatedBook },
    };
});
const getOverdueBorrows = () => __awaiter(void 0, void 0, void 0, function* () {
    // Set the overdue period in days
    const overdueLimitDays = 14;
    // Calculate the overdue date threshold (today - 14 days)
    const overdueDateThreshold = new Date();
    overdueDateThreshold.setDate(overdueDateThreshold.getDate() - overdueLimitDays);
    // Fetch all overdue borrow records
    const overdueBorrows = yield prisma.borrowRecord.findMany({
        where: {
            returnDate: null, // Only include books that haven't been returned
            borrowDate: {
                lt: overdueDateThreshold, // Check if borrowDate is more than 14 days ago
            },
        },
        include: {
            Book: {
                select: { title: true },
            },
            Member: {
                select: { name: true },
            },
        },
    });
    // Map overdue records to desired format
    const overdueList = overdueBorrows.map((borrow) => {
        // Calculate the number of overdue days
        const overdueDays = Math.floor((new Date().getTime() - new Date(borrow.borrowDate).getTime()) /
            (1000 * 60 * 60 * 24)) - overdueLimitDays;
        return {
            borrowId: borrow.borrowId,
            bookTitle: borrow.Book.title,
            borrowerName: borrow.Member.name,
            overdueDays,
        };
    });
    // Prepare the response
    if (overdueList.length > 0) {
        return {
            success: true,
            status: 200,
            message: "Overdue borrow list fetched",
            data: overdueList,
        };
    }
    else {
        return {
            success: true,
            status: 200,
            message: "No overdue books",
            data: [],
        };
    }
});
exports.BorrowServices = {
    borrowBook,
    returnBook,
    getOverdueBorrows,
};
