import { Request, Response } from "express";
import { ReturnBookServices } from "./returnBook.service"; // Ensure correct import

const returnBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { borrowId } = req.body;

    // Call the service function to return the book
    const result = await ReturnBookServices.returnBook(borrowId);

    // Send a successful response
    return res.status(200).json(result); // Return the response object directly
  } catch (error: any) {
    // Send an error response
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const ReturnBookControllers = {
  returnBook,
};

// import { Request, Response } from "express";
// import { ReturnBookServices } from "./returnBook.service";
// // import { ReturnBookServices } from "./service"; // Correct import

// const returnBook = async (req: Request, res: Response) => {
//   try {
//     const { borrowId } = req.body;

//     // Call the service function to return the book
//     const result = await ReturnBookServices.returnBook(borrowId); // Correct function call

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

// export const ReturnBookControllers = {
//   returnBook,
// };

// import { Request, Response } from "express";
// const returnBook = async (req: Request, res: Response) => {
//   try {
//     const { borrowId } = req.body;
//     // Call the service function to return the book
//     const result = await returnBook(borrowId);
//     // const result = await returnBook(borrowId);

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

// export const ReturnBookControllers = {
//   returnBook,
// };
