import { Request, Response } from "express";
import { BorrowServices } from "./borrowBook.service";

const borrowBook = async (req: Request, res: Response) => {
  try {
    const { bookId, memberId } = req.body;
    const borrowRecord = await BorrowServices.borrowBook(bookId, memberId);

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
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const BorrowControllers = { borrowBook };
