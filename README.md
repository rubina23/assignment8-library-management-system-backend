# Library Management System

## Description

A library management system backend that allows users to borrow, return, and track books. This system aims to streamline the management of library resources, handle overdue book tracking, and manage inventory efficiently.

## Live URL

[Library Management System Live Deployment](https://your-live-url-here.com)  
_Replace the above link with the actual URL where the backend is deployed._

## Technology Stack & Packages

- **Backend Framework**: Node.js with Express
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: [Specify your deployment service, e.g., Heroku, Vercel, DigitalOcean]
- **Other Libraries**:
  - `dotenv` - for environment variable management
  - `bcrypt` - for password hashing
  - `jsonwebtoken` - for authentication and authorization
  - `@prisma/client` - ORM for database management
  - `cors` - for handling cross-origin requests
  - `nodemon` - for development server reloading

## Setup Instructions

Follow these steps to set up and run the project locally:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```
2. **Install Dependencies**
   npm install
3. **Set Up Environment Variables**
   Create a .env file in the root directory and add the following:
   DATABASE_URL=your_database_url_here
   JWT_SECRET=your_jwt_secret
   PORT=your_port_number (optional)
4. **Run Database Migrations**
   npx prisma migrate dev
5. **Start the Server**
   npm run dev
   The server should now be running on http://localhost:3000.
6. **Key Features & Functionality**
   1. User Authentication: Secure login and registration with JWT-based authentication.
   2. Book Borrowing and Returning: Allows members to borrow books and updates inventory in real-time.
   3. Overdue Tracking: Tracks overdue books and generates a list of overdue borrow records.
   4. Inventory Management: Manages book availability, updating the count based on borrow/return actions.
   5. RESTful API: Designed with RESTful principles for easy frontend integration.
7. **Known Issues/Bugs**
   Overdue Notifications: Currently, overdue notifications are only available to administrators. Enhancements to notify users are planned.
   Error Handling: Minor inconsistencies in error messages across some endpoints may still be present.
