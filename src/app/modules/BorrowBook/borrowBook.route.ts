import express from "express";
import { BorrowControllers } from "./borrowBook.controller";

const router = express.Router();

router.post("/", BorrowControllers.borrowBook);

export const borrowRoutes = router;
