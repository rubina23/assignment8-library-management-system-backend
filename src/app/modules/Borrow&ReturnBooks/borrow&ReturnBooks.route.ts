import express from "express";
import { BorrowControllers } from "./borrow&ReturnBooks.controller";

const router = express.Router();

router.post("/", BorrowControllers.borrowBook);
router.post("/", BorrowControllers.returnBook);
// router.get("/", BorrowServices.getOverdueBorrows);

export const borrowRoutes = router;
