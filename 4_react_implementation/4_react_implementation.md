# Authentication Workshop with React and Node.js

This project combines a Node.js backend with a React frontend to create a complete authentication system with user registration and login functionality.

## Prerequisites

- Node.js and npm installed
- MySQL (XAMPP) installed and running
- Basic knowledge of React and TypeScript

## Project Structure

```
combined-project/
├── backend/           # Node.js backend with Express
│   ├── src/
│   │   ├── config/   # Database configuration
│   │   └── index.ts  # Main server file
│   ├── package.json
│   └── tsconfig.json
└── frontend/         # React frontend
    ├── src/
    │   ├── components/
    │   │   ├── auth/     # Authentication components
    │   │   └── layout/   # Layout components
    │   ├── services/     # API services
    │   ├── types/        # TypeScript types
    │   └── App.tsx       # Main App component
    ├── package.json
    └── tsconfig.json
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a MySQL database named `workshop` and update the `.env` file with your database credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=workshop
   JWT_SECRET=your_secret_key
   PORT=3001
   ```

4. Create the users table in MySQL:
   ```sql
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       first_name VARCHAR(50),
       last_name VARCHAR(50),
       pwd_hash VARCHAR(100)
   );
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update the `.env` file with the backend API URL:
   ```
   REACT_APP_API_URL=http://localhost:3001
   ```

4. Start the frontend development server:
   ```bash
   npm start
   ```

## Features

- User registration with password hashing
- User login with JWT authentication
- Protected routes
- Modern UI with Material-UI components
- TypeScript for type safety
- Responsive design

## API Endpoints

- `POST /api/register` - Register a new user
- `POST /api/login` - Login user and get JWT token

## Technologies Used

- Backend:
  - Node.js
  - Express
  - TypeScript
  - MySQL
  - JWT
  - bcrypt

- Frontend:
  - React
  - TypeScript
  - Material-UI
  - React Router
  - Axios

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- Secure password storage
- CORS enabled for frontend-backend communication

## Contributing

Feel free to submit issues and enhancement requests! 