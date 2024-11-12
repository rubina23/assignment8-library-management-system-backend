"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_ReturnBooks_controller_1 = require("./borrow&ReturnBooks.controller");
const router = express_1.default.Router();
router.post("/", borrow_ReturnBooks_controller_1.BorrowControllers.borrowBook);
// router.post("/", BorrowControllers.returnBook);
// router.get("/", BorrowServices.getOverdueBorrows);
exports.borrowRoutes = router;
