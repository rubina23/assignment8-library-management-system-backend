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
exports.BookServices = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const bookData = {
        title: data.title,
        genre: data.genre,
        publishedYear: data.publishedYear,
        totalCopies: data.totalCopies,
        availableCopies: data.availableCopies,
    };
    // Save the new member in the database
    const newBook = yield prisma.book.create({
        data: bookData,
    });
    return newBook;
});
const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.findMany();
    return result;
});
const getBookById = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.book.findUnique({
        where: {
            bookId: bookId,
        },
    });
});
const updateBookById = (bookId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.book.update({
        where: {
            bookId: bookId,
        },
        data: data,
    });
});
const deleteBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.book.delete({
        where: {
            bookId: bookId,
        },
    });
});
exports.BookServices = {
    createBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBook,
};
