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
    return { success: true, message: "Book returned successfully" };
  },
};
