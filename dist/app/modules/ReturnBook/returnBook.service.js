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
exports.ReturnBookServices = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const returnBook = (borrowId) => __awaiter(void 0, void 0, void 0, function* () {
    const [updatedBorrow, updatedBook] = yield prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const borrowRecord = yield prisma.borrowRecord.findUnique({
            where: { borrowId },
            include: { Book: true },
        });
        if (!borrowRecord || borrowRecord.returnDate) {
            throw new Error("Invalid borrow record or book already returned");
        }
        const bookId = borrowRecord.bookId;
        if (!bookId) {
            throw new Error("No book associated with this borrow record");
        }
        const updatedBorrow = yield prisma.borrowRecord.update({
            where: { borrowId },
            data: {
                returnDate: new Date(),
            },
        });
        const updatedBook = yield prisma.book.update({
            where: { bookId },
            data: { availableCopies: { increment: 1 } },
        });
        return [updatedBorrow, updatedBook];
    }));
    return {
        success: true,
        message: "Book returned successfully",
        data: { updatedBorrow, updatedBook },
    };
});
exports.ReturnBookServices = {
    returnBook,
};
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// const returnBook = async (borrowId: string) => {
//   // Start a transaction
//   const [updatedBorrow, updatedBook] = await prisma.$transaction(
//     async (prisma) => {
//       // Find the borrow record and ensure it includes the associated book
//       const borrowRecord = await prisma.borrowRecord.findUnique({
//         where: { borrowId },
//         include: { Book: true },
//       });
//       // Check if the borrow record exists and if the book has already been returned
//       if (!borrowRecord || borrowRecord.returnDate) {
//         throw new Error("Invalid borrow record or book already returned");
//       }
//       // Ensure bookId is available and valid
//       const bookId = borrowRecord.bookId;
//       if (!bookId) {
//         throw new Error("No book associated with this borrow record");
//       }
//       // Update the borrow record with the return date
//       const updatedBorrow = await prisma.borrowRecord.update({
//         where: { borrowId },
//         data: {
//           returnDate: new Date(),
//         },
//       });
//       // Update the available copies of the book
//       const updatedBook = await prisma.book.update({
//         where: { bookId },
//         data: { availableCopies: { increment: 1 } }, // Increment available copies by 1
//       });
//       return [updatedBorrow, updatedBook];
//     }
//   );
//   return {
//     success: true,
//     message: "Book returned successfully",
//     data: { updatedBorrow, updatedBook },
//   };
// };
// export const ReturnBookServices = {
//   returnBook,
// };
