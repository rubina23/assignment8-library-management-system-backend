import { Request, Response } from "express";
import { ReturnBookServices } from "./returnBook.service";

const returnBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { borrowId } = req.body;
    const result = await ReturnBookServices.returnBook(borrowId);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const ReturnBookControllers = {
  returnBook,
};
