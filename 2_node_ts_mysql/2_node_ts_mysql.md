# Workshop: TypeScript and Node.js - Building a Basic Backend with Express and MySQL (XAMPP)

## Workshop Overview
In this workshop, you will learn how to set up a **TypeScript** and **Node.js** project and build a simple backend using **Express** with **MySQL (XAMPP)**. This hands-on session will cover:

- Setting up a TypeScript and Node.js environment
- Configuring TypeScript for a backend project
- Creating an Express server with TypeScript
- Implementing basic API routes
- Connecting to a MySQL database using XAMPP
- Fetching and managing data from MySQL
- Using middleware and handling errors

---

## Prerequisites
- Basic knowledge of JavaScript and Node.js
- Node.js and npm installed (https://nodejs.org/)
- MySQL installed via **XAMPP** (https://www.apachefriends.org/)
- A code editor (VS Code recommended)

---

## Step 1: Project Setup

1. Create a new project directory and navigate into it:
   ```sh
   mkdir ts-node-express-workshop
   cd ts-node-express-workshop
   ```

2. Initialize a **Node.js** project:
   ```sh
   npm init -y
   ```

3. Install TypeScript and necessary dependencies:
   ```sh
   npm install --save-dev typescript ts-node @types/node @types/express nodemon
   ```

4. Install Express and MySQL dependencies:
   ```sh
   npm install express mysql2 dotenv
   ```

5. Install type definitions:
   ```sh
   npm install --save-dev @types/express
   ```

6. Generate a **tsconfig.json** file:
   ```sh
   npx tsc --init
   ```

7. Update **tsconfig.json** with the following settings:
   ```json
   {
     "compilerOptions": {
       "target": "ES6",
       "module": "CommonJS",
       "outDir": "dist",
       "rootDir": "src",
       "strict": true
     }
   }
   ```

---

## Step 2: Setting Up MySQL Database (XAMPP)

1. Open **XAMPP Control Panel** and start **MySQL**.
2. Open **phpMyAdmin** (`http://localhost/phpmyadmin/`).
3. Create a new database called `workshop_db`.
4. Create a table `users` with the following schema:
   ```sql
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(100) NOT NULL
   );
   ```
5. Insert some test data:
   ```sql
    create table users (
        id INT,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        pwd_hash VARCHAR(50)
    );
    insert into users (id, first_name, last_name, pwd_hash) values (1, 'Obidiah', 'Kinver', '$2a$04$bJ1W3S/q0lusVio53LvpaOTJprBDepKCqW/YBN70aG0kenN23LgqK');
    insert into users (id, first_name, last_name, pwd_hash) values (2, 'Laurens', 'Naton', '$2a$04$eH5tGN63xCPE5.jINE43xeeVnFqlgi360yTJRgCIR6vo27wXl8HU.');
    insert into users (id, first_name, last_name, pwd_hash) values (3, 'Sheree', 'Gann', '$2a$04$w0lS.t0fng5BLFyO4aWA6O4y3q3T5DEN4/KDjTX5oTzdBvBBE82/y');
    insert into users (id, first_name, last_name, pwd_hash) values (4, 'Allene', 'Norledge', '$2a$04$TiYTrCrrgQroeyFHyh2ydOWjP8StTrUM6wA1rnhbqC.stFYJY0Ck.');
    insert into users (id, first_name, last_name, pwd_hash) values (5, 'Tonie', 'Bevington', '$2a$04$1RDNGcaF/2c4mx3ZpljAP.DeJGQsuTDCGc7c4bDiDhyI1poCWhWYW');
   ```

---

## Step 3: Creating the Express Server

1. Create a `src` directory and an `index.ts` file inside it:
   ```sh
   mkdir src
   touch src/index.ts
   ```

2. Create a `.env` file to store database credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_DATABASE=workshop_db
   ```

3. Open `src/index.ts` and add the following code:
   ```ts
   import express from 'express';
   import dotenv from 'dotenv';
   import mysql from 'mysql2';

   dotenv.config();

   const app = express();
   const PORT = process.env.PORT || 3000;

   app.use(express.json());

   // Create a MySQL connection
   const db = mysql.createConnection({
       host: process.env.DB_HOST,
       user: process.env.DB_USER,
       password: process.env.DB_PASSWORD,
       database: process.env.DB_DATABASE
   });

   db.connect(err => {
       if (err) {
           console.error('Database connection failed:', err);
           return;
       }
       console.log('Connected to MySQL database');
   });

   app.get('/', (req, res) => {
       res.send('Hello, TypeScript with Express and MySQL!');
   });

   app.listen(PORT, () => {
       console.log(`Server running on http://localhost:${PORT}`);
   });
   ```

4. Add a **start script** in `package.json`:
   ```json
   "scripts": {
     "start": "node dist/index.js",
     "dev": "nodemon src/index.ts"
   }
   ```

5. Run the server:
   ```sh
   npm run dev
   ```

6. Open a browser or use Postman to access `http://localhost:3000/`. You should see **"Hello, TypeScript with Express and MySQL!"**.

---

## Step 4: Fetching Data from MySQL

Modify `src/index.ts` to include a route that fetches users from the database:

```ts
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});
```

### Creating a New User
```ts
app.post('/users', (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO users (name) VALUES (?)', [name], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId, name });
    });
});
```

### Deleting a User
```ts
app.delete('/users/:id', (req, res) => {
    db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'User deleted' });
    });
});
```

---

## Step 5: Handling Errors and Middleware

Create an `errorHandler.ts` middleware in `src/middleware/errorHandler.ts`:

```ts
import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message || 'Internal Server Error' });
};

export default errorHandler;
```

Modify `src/index.ts` to use the middleware:

```ts
import errorHandler from './middleware/errorHandler';
app.use(errorHandler);
```

---

## Conclusion
You have successfully integrated **MySQL** with **TypeScript and Express**. You learned:

- How to set up MySQL using **XAMPP**
- How to connect Node.js to MySQL
- How to fetch and manage data from MySQL

You can expand this further by adding authentication, validation, or integrating an ORM like **Prisma** or **TypeORM**!

---

## Next Steps
- Implement authentication (JWT, OAuth)
- Use an ORM like TypeORM or Prisma
- Add unit tests with Jest

Happy coding! 🚀

