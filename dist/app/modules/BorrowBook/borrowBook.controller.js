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
exports.BorrowControllers = void 0;
const borrowBook_service_1 = require("./borrowBook.service");
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId, memberId } = req.body;
        const borrowRecord = yield borrowBook_service_1.BorrowServices.borrowBook(bookId, memberId);
        res.status(200).json({
            success: true,
            status: 200,
            message: "Book borrowed successfully",
            data: {
                borrowId: borrowRecord.borrowId,
                bookId: borrowRecord.bookId,
                memberId: borrowRecord.memberId,
                borrowDate: borrowRecord.borrowDate,
            },
        });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
exports.BorrowControllers = { borrowBook };
