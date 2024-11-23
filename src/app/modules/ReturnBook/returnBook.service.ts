import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const returnBook = async (borrowId: string) => {
  const [updatedBorrow, updatedBook] = await prisma.$transaction(
    async (prisma) => {
      const borrowRecord = await prisma.borrowRecord.findUnique({
        where: { borrowId },
        include: { Book: true },
      });

      if (!borrowRecord || borrowRecord.returnDate) {
        throw new Error("Invalid borrow record or book already returned");
      }

      const bookId = borrowRecord.bookId;
      if (!bookId) {
        throw new Error("No book associated with this borrow record");
      }

      const updatedBorrow = await prisma.borrowRecord.update({
        where: { borrowId },
        data: {
          returnDate: new Date(),
        },
      });

      const updatedBook = await prisma.book.update({
        where: { bookId },
        data: { availableCopies: { increment: 1 } },
      });

      return [updatedBorrow, updatedBook];
    }
  );

  return {
    success: true,
    message: "Book returned successfully",
    data: { updatedBorrow, updatedBook },
  };
};

export const ReturnBookServices = {
  returnBook: async (
    borrowId: string
  ): Promise<{ success: boolean; message: string }> => {
    // Handle the return logic here (e.g., updating the database)
    return { success: true, message: "Book returned successfully" };
  },
};

// returnBook.service.ts
// export const ReturnBookServices = {
//   returnBook: async (borrowId: string) => {
//     // Logic to return the book
//     return { success: true, message: "Book returned successfully" };
//   },
// };

// export const ReturnBookServices = {
//   returnBook,
// };

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const returnBook = async (borrowId: string) => {
//   // Start a transaction
//   const [updatedBorrow, updatedBook] = await prisma.$transaction(
//     async (prisma) => {
//       // Find the borrow record and ensure it includes the associated book
//       const borrowRecord = await prisma.borrowRecord.findUnique({
//         where: { borrowId },
//         include: { Book: true },
//       });

//       // Check if the borrow record exists and if the book has already been returned
//       if (!borrowRecord || borrowRecord.returnDate) {
//         throw new Error("Invalid borrow record or book already returned");
//       }

//       // Ensure bookId is available and valid
//       const bookId = borrowRecord.bookId;
//       if (!bookId) {
//         throw new Error("No book associated with this borrow record");
//       }

//       // Update the borrow record with the return date
//       const updatedBorrow = await prisma.borrowRecord.update({
//         where: { borrowId },
//         data: {
//           returnDate: new Date(),
//         },
//       });

//       // Update the available copies of the book
//       const updatedBook = await prisma.book.update({
//         where: { bookId },
//         data: { availableCopies: { increment: 1 } }, // Increment available copies by 1
//       });

//       return [updatedBorrow, updatedBook];
//     }
//   );

//   return {
//     success: true,
//     message: "Book returned successfully",
//     data: { updatedBorrow, updatedBook },
//   };
// };

// export const ReturnBookServices = {
//   returnBook,
// };
