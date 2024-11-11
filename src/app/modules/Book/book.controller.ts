import { NextFunction, Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import { BookServices } from "./book.service";

const createBook = async (req: Request, res: Response) => {
  try {
    const { title, genre, publishedYear, totalCopies, availableCopies } =
      req.body;

    const result = await BookServices.createBook({
      title,
      genre,
      publishedYear,
      totalCopies,
      availableCopies,
    });

    sendResponse(res, {
      statusCode: 201,
      status: 201,
      success: true,
      message: "Book created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Book already exists!",
      error: err.name,
    });
  }
};

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const result = await BookServices.getAllBooks();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      status: 200,
      message: "Books retrieved successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Books not found!",
    });
  }
};

const getBookById = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const result = await BookServices.getBookById(bookId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      status: 200,
      message: "Book retrieved successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Book not found!",
    });
  }
};

const updateBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
    const { title, genre, publishedYear, totalCopies, availableCopies } =
      req.body;
    const updatedBookData = {
      title,
      genre,
      publishedYear,
      totalCopies,
      availableCopies,
    };
    const result = await BookServices.updateBookById(bookId, updatedBookData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      status: 200,
      message: "Book updated successfully",
      data: result,
    });
  } catch (err) {
    // next(err);
    res.status(500).json({
      success: false,
      message: "Book not found!",
    });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const result = await BookServices.deleteBook(bookId);

    res.status(200).json({
      success: true,
      status: 200,
      message: "Book successfully deleted",
      //   data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.name || "Book not found!",
      error: err,
    });
  }
};

export const BookControllers = {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBook,
};
