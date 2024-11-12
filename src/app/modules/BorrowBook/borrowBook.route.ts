import express from "express";
import { BorrowControllers } from "./borrowBook.controller";

const router = express.Router();

router.post("/", BorrowControllers.borrowBook);
// router.post("/", BorrowControllers.returnBook);
// router.get("/", BorrowServices.getOverdueBorrows);

export const borrowRoutes = router;
