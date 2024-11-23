"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const member_route_1 = require("../modules/Member/member.route");
const book_route_1 = require("../modules/Book/book.route");
const borrowBook_route_1 = require("../modules/BorrowBook/borrowBook.route");
const returnBook_route_1 = require("../modules/ReturnBook/returnBook.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/members",
        route: member_route_1.memberRoutes,
    },
    {
        path: "/books",
        route: book_route_1.bookRoutes,
    },
    {
        path: "/borrow",
        route: borrowBook_route_1.borrowRoutes,
    },
    {
        path: "/return",
        route: returnBook_route_1.returnBookRoutes,
    },
    // {
    //   path: "/borrow/overdue",
    //   route: borrowRoutes,
    // },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
