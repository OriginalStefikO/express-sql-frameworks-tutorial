# Workshop: Authentication with MySQL (XAMPP) and JWT in Node.js

## Workshop Overview
In this workshop, you will learn how to implement authentication in a **Node.js** application using **MySQL (XAMPP)** and **JWT (JSON Web Token)** to securely authenticate users. After a successful login, the user will receive a **JWT token** that can be used for authorization in protected routes.

### Learning Goals
- Set up MySQL with XAMPP
- Create and seed a user database
- Build an HTML form for user registration and login
- Implement authentication in Node.js using Express, bcrypt, and JWT

---

## Prerequisites
- **XAMPP installed** ([Download](https://www.apachefriends.org/index.html))
- **Node.js and npm installed** ([Download](https://nodejs.org/))
- **A code editor (VS Code recommended)**

---

## Step 1: Setting Up MySQL with XAMPP

1. Open **XAMPP Control Panel** and start **Apache** and **MySQL**.
2. Open **phpMyAdmin** by visiting:
   ```
   http://localhost/phpmyadmin/
   ```
3. Create a new database named **auth_workshop_db**.
4. Run the following SQL command in phpMyAdmin to create and seed the `users` table:
   ```sql
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       first_name VARCHAR(50),
       last_name VARCHAR(50),
       pwd_hash VARCHAR(100)
   );
   ```

---

## Step 2: Creating the Registration and Login Forms

### Registration Form
Create a `public/register/index.html` file with the following code:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
</head>
<body>
    <h2>Register</h2>
    <form action="/register" method="POST">
        <label for="first_name">First Name:</label>
        <input type="text" name="first_name" required>
        
        <label for="last_name">Last Name:</label>
        <input type="text" name="last_name" required>
        
        <label for="password">Password:</label>
        <input type="password" name="password" required>
        
        <button type="submit">Register</button>
    </form>
    <p>Already have an account? <a href="/">Login here</a></p>
</body>
</html>
```

### Login Form
Create a `public/index.html` file with the following code:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h2>Login</h2>
    <form action="/login" method="POST">
        <label for="first_name">First Name:</label>
        <input type="text" name="first_name" required>
        
        <label for="last_name">Last Name:</label>
        <input type="text" name="last_name" required>
        
        <label for="password">Password:</label>
        <input type="password" name="password" required>
        
        <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <a href="/register">Register here</a></p>
</body>
</html>
```

---

## Step 3: Setting Up the Node.js Project

1. Initialize the project:
   ```sh
   npm init -y
   ```
2. Install dependencies:
   ```sh
   npm install express mysql2 bcrypt dotenv cors body-parser jsonwebtoken
   ```
3. Install TypeScript and types:
   ```sh
   npm install --save-dev typescript @types/node @types/express @types/bcrypt @types/jsonwebtoken
   ```
4. Generate a **tsconfig.json**:
   ```sh
   npx tsc --init
   ```

---

## Step 4: Connecting to MySQL

1. Create a `.env` file and add:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=auth_workshop_db
   JWT_SECRET=supersecretkey
   ```
2. Create a `src/config/db.ts` file:
   ```ts
   import mysql from 'mysql2';
   import dotenv from 'dotenv';

   dotenv.config();

   const pool = mysql.createPool({
       host: process.env.DB_HOST,
       user: process.env.DB_USER,
       password: process.env.DB_PASSWORD,
       database: process.env.DB_NAME
   }).promise();

   export default pool;
   ```

---

## Step 5: Implementing Authentication with JWT

1. Create `src/index.ts` and set up the authentication routes:
   ```ts
   import express from 'express';
   import bcrypt from 'bcrypt';
   import cors from 'cors';
   import bodyParser from 'body-parser';
   import jwt from 'jsonwebtoken';
   import dotenv from 'dotenv';
   import pool from './config/db';

   dotenv.config();
   const app = express();
   const PORT = 3000;
   const SECRET_KEY = process.env.JWT_SECRET || 'defaultsecret';

   app.use(cors());
   app.use(bodyParser.urlencoded({ extended: true }));
   app.use(express.urlencoded({ extended: true }));
   app.use(express.static('public'));

   interface User {
       id: number;
       first_name: string;
       last_name: string;
       pwd_hash: string;
   }

   app.post('/register', async (req, res) => {
       const { first_name, last_name, password } = req.body;
       const hashedPassword = await bcrypt.hash(password, 10);

       try {
           await pool.query(
               'INSERT INTO users (first_name, last_name, pwd_hash) VALUES (?, ?, ?)',
               [first_name, last_name, hashedPassword]
           );
           res.send('User registered successfully');
       } catch (err) {
           res.status(500).send('Error registering user');
       }
   });

   app.post('/login', async (req, res) => {
       const { first_name, last_name, password } = req.body;

       try {
           const [rows] = await pool.query(
               'SELECT * FROM users WHERE first_name = ? AND last_name = ?',
               [first_name, last_name]
           );

           if (Array.isArray(rows) && rows.length > 0) {
               const user = rows[0] as User;
               const passwordMatch = await bcrypt.compare(password, user.pwd_hash);
               if (passwordMatch) {
                   const token = jwt.sign({ first_name, last_name }, SECRET_KEY, { expiresIn: '1h' });
                   return res.json({ token });
               }
           }
           res.status(401).send('Invalid credentials');
       } catch (err) {
           res.status(500).send('Server error');
       }
   });

   app.listen(PORT, () => {
       console.log(`Server running on http://localhost:${PORT}`);
   });
   ```

---

## Conclusion
You have successfully implemented:
- User registration with password hashing
- Secure login authentication using bcrypt
- JWT authentication for protected routes
- Navigation between login and registration pages
- TypeScript interfaces for type safety

Happy coding! 🚀