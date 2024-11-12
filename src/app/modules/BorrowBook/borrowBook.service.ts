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

// const getOverdueBorrows = async () => {
//   // Set the overdue period in days
//   const overdueLimitDays = 14;

//   // Calculate the overdue date threshold (today - 14 days)
//   const overdueDateThreshold = new Date();
//   overdueDateThreshold.setDate(
//     overdueDateThreshold.getDate() - overdueLimitDays
//   );

//   // Fetch all overdue borrow records
//   const overdueBorrows = await prisma.borrowRecord.findMany({
//     where: {
//       returnDate: null, // Only include books that haven't been returned
//       borrowDate: {
//         lt: overdueDateThreshold, // Check if borrowDate is more than 14 days ago
//       },
//     },
//     include: {
//       Book: {
//         select: { title: true },
//       },
//       Member: {
//         select: { name: true },
//       },
//     },
//   });

//   // Map overdue records to desired format
//   const overdueList = overdueBorrows.map((borrow) => {
//     // Calculate the number of overdue days
//     const overdueDays =
//       Math.floor(
//         (new Date().getTime() - new Date(borrow.borrowDate).getTime()) /
//           (1000 * 60 * 60 * 24)
//       ) - overdueLimitDays;

//     return {
//       borrowId: borrow.borrowId,
//       bookTitle: borrow.Book.title,
//       borrowerName: borrow.Member.name,
//       overdueDays,
//     };
//   });

//   // Prepare the response
//   if (overdueList.length > 0) {
//     return {
//       success: true,
//       status: 200,
//       message: "Overdue borrow list fetched",
//       data: overdueList,
//     };
//   } else {
//     return {
//       success: true,
//       status: 200,
//       message: "No overdue books",
//       data: [],
//     };
//   }
// };

export const BorrowServices = {
  borrowBook,
};
// export const BorrowServices = {
//   borrowBook,
//   returnBook,
//   getOverdueBorrows,
// };
