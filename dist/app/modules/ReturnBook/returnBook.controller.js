"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnBookControllers = void 0;
const returnBook_service_1 = require("./returnBook.service"); // Ensure correct import
const returnBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { borrowId } = req.body;
        // Call the service function to return the book
        const result = yield returnBook_service_1.ReturnBookServices.returnBook(borrowId);
        // Send a successful response
        return res.status(200).json(result); // Return the response object directly
    }
    catch (error) {
        // Send an error response
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
exports.ReturnBookControllers = {
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
