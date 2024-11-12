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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookControllers = void 0;
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const book_service_1 = require("./book.service");
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, genre, publishedYear, totalCopies, availableCopies } = req.body;
        const result = yield book_service_1.BookServices.createBook({
            title,
            genre,
            publishedYear,
            totalCopies,
            availableCopies,
        });
        (0, sendResponse_1.default)(res, {
            statusCode: 201,
            status: 201,
            success: true,
            message: "Book created successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Book already exists!",
            error: err.name,
        });
    }
});
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_service_1.BookServices.getAllBooks();
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            status: 200,
            message: "Books retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Books not found!",
        });
    }
});
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const result = yield book_service_1.BookServices.getBookById(bookId);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            status: 200,
            message: "Book retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Book not found!",
        });
    }
});
const updateBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const { title, genre, publishedYear, totalCopies, availableCopies } = req.body;
        const updatedBookData = {
            title,
            genre,
            publishedYear,
            totalCopies,
            availableCopies,
        };
        const result = yield book_service_1.BookServices.updateBookById(bookId, updatedBookData);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            status: 200,
            message: "Book updated successfully",
            data: result,
        });
    }
    catch (err) {
        // next(err);
        res.status(500).json({
            success: false,
            message: "Book not found!",
        });
    }
});
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const result = yield book_service_1.BookServices.deleteBook(bookId);
        res.status(200).json({
            success: true,
            status: 200,
            message: "Book successfully deleted",
            //   data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.name || "Book not found!",
            error: err,
        });
    }
});
exports.BookControllers = {
    createBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBook,
};
