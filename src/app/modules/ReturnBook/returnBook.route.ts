import express from "express";
import { ReturnBookControllers } from "./returnBook.controller";

const router = express.Router();
router.use(express.json());

router.post("/", ReturnBookControllers.returnBook);

export const returnBookRoutes = router;
