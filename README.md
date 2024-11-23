# Library Management System

## Description

A library management system backend that allows users to borrow, return, and track books. This system aims to the management of library resources, handle overdue book tracking, and manage inventory efficiently.

## Live URL

https://assignment8-library-management-system-backend.vercel.app/

## Technology Stack & Packages

- **Backend Framework**: Node.js with Express
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Vercel
- **Other Libraries**:
  - `dotenv` - for environment variable management
  - `@prisma/client` - ORM for database management
  - `cors` - for handling cross-origin requests
  - `nodemon` - for development server reloading

## Setup Instructions

Follow these steps to set up and run the project locally:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/rubina23/assignment8-library-management-system-backend
   cd your-repository
   ```
2. **Install Dependencies**
   npm install
3. **Set Up Environment Variables**
   Create a .env file in the root directory and add the following:

   DATABASE_URL= postgresql://library_management_system_backend_user:qNzpmgP1ipV7Fy963R2l019QVi7ojX7j@dpg-cspdcoggph6c73d0ncp0-a.oregon-postgres.render.com/library_management_system_backend

4. **Run Database Migrations**
   npx prisma migrate dev

5. **Start the Server**
   npm run dev
   The server should now be running on http://localhost:3000.
6. **Key Features & Functionality**
   1. Member and Book Creating
   2. Book Borrowing and Returning: Allows members to borrow books and updates inventory in real-time.
   3. Overdue Tracking: Tracks overdue books and generates a list of overdue borrow records.
   4. Inventory Management: Manages book availability, updating the count based on borrow/return actions.
