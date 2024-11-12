import express from "express";
import { memberRoutes } from "../modules/Member/member.route";
import { bookRoutes } from "../modules/Book/book.route";
import { borrowRoutes } from "../modules/BorrowBook/borrowBook.route";
import { returnBookRoutes } from "../modules/ReturnBook/returnBook.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/members",
    route: memberRoutes,
  },
  {
    path: "/books",
    route: bookRoutes,
  },
  {
    path: "/borrow",
    route: borrowRoutes,
  },
  {
    path: "/return",
    route: returnBookRoutes,
  },
  // {
  //   path: "/borrow/overdue",
  //   route: borrowRoutes,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
