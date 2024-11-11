import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createBook = async (data: {
  title: string;
  genre: string;
  publishedYear: number;
  totalCopies: number;
  availableCopies: number;
}) => {
  const bookData = {
    title: data.title,
    genre: data.genre,
    publishedYear: data.publishedYear,
    totalCopies: data.totalCopies,
    availableCopies: data.availableCopies,
  };

  // Save the new member in the database
  const newBook = await prisma.book.create({
    data: bookData,
  });
  return newBook;
};

const getAllBooks = async () => {
  const result = await prisma.book.findMany();
  return result;
};

const getBookById = async (bookId: string) => {
  return prisma.book.findUnique({
    where: {
      bookId: bookId,
    },
  });
};

const updateBookById = async (bookId: string, data: any) => {
  return prisma.book.update({
    where: {
      bookId: bookId,
    },
    data: data,
  });
};

const deleteBook = async (bookId: string) => {
  return prisma.book.delete({
    where: {
      bookId: bookId,
    },
  });
};

export const BookServices = {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBook,
};
