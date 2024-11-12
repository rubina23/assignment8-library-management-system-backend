import { Request, Response } from "express";
import { BorrowServices } from "./borrow&ReturnBooks.service";

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

// const returnBook = async (req: Request, res: Response) => {
//   try {
//     const { borrowId } = req.body;
//     // Call the service function to return the book
//     const result = await returnBook(borrowId);

//     // Send a successful response
//     return res.status(200).json(result);
//   } catch (error: any) {
//     // Send an error response
//     return res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const BorrowControllers = { borrowBook };
// export const BorrowControllers = { borrowBook, returnBook };
