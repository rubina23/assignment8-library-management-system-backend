import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const borrowBook = async (bookId: string, memberId: string) => {
  const book = await prisma.book.findUnique({ where: { bookId } });

  if (!book || book.availableCopies <= 0) {
    throw new Error("Book is not available for borrowing");
  }

  const borrowRecord = await prisma.borrowRecord.create({
    data: {
      bookId,
      memberId,
      borrowDate: new Date(),
    },
  });

  await prisma.book.update({
    where: { bookId },
    data: { availableCopies: { decrement: 1 } },
  });

  return borrowRecord;
};

export const BorrowServices = {
  borrowBook,
};
// export const BorrowServices = {
//   borrowBook,
//   returnBook,
//   getOverdueBorrows,
// };
