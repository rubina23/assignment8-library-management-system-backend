import express from "express";
import { memberRoutes } from "../modules/Member/member.route";
import { bookRoutes } from "../modules/Book/book.route";
import { borrowRoutes } from "../modules/Borrow&ReturnBooks/borrow&ReturnBooks.route";
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
    route: borrowRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
