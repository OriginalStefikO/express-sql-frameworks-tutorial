# Workshop: Authentication with MySQL (XAMPP) and Bcrypt in Node.js

## Workshop Overview
In this workshop, you will learn how to implement authentication in a **Node.js** application using **MySQL (XAMPP)** and **bcrypt** to securely check hashed passwords. After a successful login, the user will see a message: **"You are logged in"**.

### Learning Goals
- Set up MySQL with XAMPP
- Create and seed a user database
- Build an HTML form for user login
- Implement authentication in Node.js using Express and bcrypt

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
   create table users (
      id INT,
      first_name VARCHAR(50),
      last_name VARCHAR(50),
      pwd_hash VARCHAR(50)
   );

   INSERT INTO users (id, first_name, last_name, pwd_hash) VALUES
   insert into users (id, first_name, last_name, pwd_hash) values (1, 'Ninnette', 'Dilawey', '$2a$04$qWvl0ARDq6dz4MPwdWPp9u2SYfhTakjmzHrpvU4gHK74pSLvabcba');
   insert into users (id, first_name, last_name, pwd_hash) values (2, 'Annora', 'Bittany', '$2a$04$D4DNvpjdfe3dMnUUTM/wn.iO0EEUiLfIA3hsoCEiYRgmxj4jPSTA2');
   insert into users (id, first_name, last_name, pwd_hash) values (3, 'Maye', 'Clowney', '$2a$04$dg9stiRRp33ep2rDs0dRU.sIi.gatYSKy2U.LkzvXrUAdlqcapWqm');
   insert into users (id, first_name, last_name, pwd_hash) values (4, 'Shannen', 'Stedell', '$2a$04$RlNIf7eE1Vd2aH5JikOqyOVsWGmBKXyEBwAlCnNjca1t5yYv.UsK6');
   insert into users (id, first_name, last_name, pwd_hash) values (5, 'Davida', 'O''Dare', '$2a$04$UeXh4vVS83wwCimE0O7PK.alk1Z0LE7Cb/gix34lLSoHf/A4HLBBq');
   insert into users (id, first_name, last_name, pwd_hash) values (6, 'Rene', 'Iwanowicz', '$2a$04$ESsXj08xuNeQ/f/cHr9jVuRWbAgorifjzNZQHkibk6ztLQCK3YyRe');
   insert into users (id, first_name, last_name, pwd_hash) values (7, 'Luther', 'Yonge', '$2a$04$Zz3LhbS5xknfwxeetYMOZeivE1x27sTr9rPEfMbuX5urxMHAv84u6');
   insert into users (id, first_name, last_name, pwd_hash) values (8, 'Phyllys', 'Keilty', '$2a$04$pKnRfiMWHgrnI1YoQer76OCsjJP64PhWSA9LhW2/VlPT2O3xReEZC');
   insert into users (id, first_name, last_name, pwd_hash) values (9, 'Neille', 'Audenis', '$2a$04$0As1Tp29Pqm.GQvBph898OCDnZlAgShjfTLOjetov/0JHvqgA6fmq');
   insert into users (id, first_name, last_name, pwd_hash) values (10, 'Clara', 'Cupper', '$2a$04$6.1s8A3JR.Vyc.jzxvKMoO5l10NgU47qNWc37r7kN7v1IKjZwnqs2');
   insert into users (id, first_name, last_name, pwd_hash) values (11, 'Ariana', 'Bister', '$2a$04$TAAu9AcM1ZgjFJwxQEB3TeuYQ1E2lGJHRtawawC2vA1lmmx9apTrC');
   insert into users (id, first_name, last_name, pwd_hash) values (12, 'Garwood', 'Mussared', '$2a$04$9Fpdp.z4KsTWy/qe1h44Je1GitL2ypj5sFKI0L5yrqwn97OGS4clW');
   insert into users (id, first_name, last_name, pwd_hash) values (13, 'Cos', 'Parkey', '$2a$04$hJmEjOCfMIxzam8I0.eNFeEXq3m/6YicjgJ/Elk2pf6aUfnT2UFN6');
   insert into users (id, first_name, last_name, pwd_hash) values (14, 'Aeriell', 'Sturgess', '$2a$04$Z6e2vXdEZ9qvPODrWlxpfu08hj.c1GzcKQ8fF45f6qOvNf/5g1NY2');
   insert into users (id, first_name, last_name, pwd_hash) values (15, 'Tracey', 'Caen', '$2a$04$kno4/8X7nNvEYzz42Ls7U.Sw38beZ0NC8vqdMr5//DKQLNXHseDi.');
   insert into users (id, first_name, last_name, pwd_hash) values (16, 'Colby', 'Junifer', '$2a$04$jOnzMj13aNXxy0sf8cNTcutWN79.Clnzvisx2q6BkmZCfsmdI6Jkm');
   insert into users (id, first_name, last_name, pwd_hash) values (17, 'Phil', 'Dat', '$2a$04$TOcKyCRoC033Xvx0lsobmOjKicBTSPFy0z9LAXHaEVUrfSSBDGsiO');
   insert into users (id, first_name, last_name, pwd_hash) values (18, 'Carson', 'Wildber', '$2a$04$bg/nLZIYbjXKd8s2vmA4XuDf1tmJRBvxIu29jlud0Ik5EUmBmFMRq');
   insert into users (id, first_name, last_name, pwd_hash) values (19, 'Gerladina', 'Atwel', '$2a$04$ykLuyzUKqBHEt6cCcykUYuOfyplLo7fSqEEVO.NyfR8smBOkiVLFa');
   insert into users (id, first_name, last_name, pwd_hash) values (20, 'Carl', 'Ashard', '$2a$04$G6uRar9SvNWbna2mFDM9MucMV8cRFFs/mTORS1/sBOm0HLl7dLvsS');
   insert into users (id, first_name, last_name, pwd_hash) values (1, 'Ninnette', 'Dilawey', '$2a$04$qWvl0ARDq6dz4MPwdWPp9u2SYfhTakjmzHrpvU4gHK74pSLvabcba');
   insert into users (id, first_name, last_name, pwd_hash) values (2, 'Annora', 'Bittany', '$2a$04$D4DNvpjdfe3dMnUUTM/wn.iO0EEUiLfIA3hsoCEiYRgmxj4jPSTA2');
   insert into users (id, first_name, last_name, pwd_hash) values (3, 'Maye', 'Clowney', '$2a$04$dg9stiRRp33ep2rDs0dRU.sIi.gatYSKy2U.LkzvXrUAdlqcapWqm');
   insert into users (id, first_name, last_name, pwd_hash) values (4, 'Shannen', 'Stedell', '$2a$04$RlNIf7eE1Vd2aH5JikOqyOVsWGmBKXyEBwAlCnNjca1t5yYv.UsK6');
   insert into users (id, first_name, last_name, pwd_hash) values (5, 'Davida', 'O''Dare', '$2a$04$UeXh4vVS83wwCimE0O7PK.alk1Z0LE7Cb/gix34lLSoHf/A4HLBBq');
   insert into users (id, first_name, last_name, pwd_hash) values (6, 'Rene', 'Iwanowicz', '$2a$04$ESsXj08xuNeQ/f/cHr9jVuRWbAgorifjzNZQHkibk6ztLQCK3YyRe');
   insert into users (id, first_name, last_name, pwd_hash) values (7, 'Luther', 'Yonge', '$2a$04$Zz3LhbS5xknfwxeetYMOZeivE1x27sTr9rPEfMbuX5urxMHAv84u6');
   insert into users (id, first_name, last_name, pwd_hash) values (8, 'Phyllys', 'Keilty', '$2a$04$pKnRfiMWHgrnI1YoQer76OCsjJP64PhWSA9LhW2/VlPT2O3xReEZC');
   insert into users (id, first_name, last_name, pwd_hash) values (9, 'Neille', 'Audenis', '$2a$04$0As1Tp29Pqm.GQvBph898OCDnZlAgShjfTLOjetov/0JHvqgA6fmq');
   insert into users (id, first_name, last_name, pwd_hash) values (10, 'Clara', 'Cupper', '$2a$04$6.1s8A3JR.Vyc.jzxvKMoO5l10NgU47qNWc37r7kN7v1IKjZwnqs2');
   insert into users (id, first_name, last_name, pwd_hash) values (11, 'Ariana', 'Bister', '$2a$04$TAAu9AcM1ZgjFJwxQEB3TeuYQ1E2lGJHRtawawC2vA1lmmx9apTrC');
   insert into users (id, first_name, last_name, pwd_hash) values (12, 'Garwood', 'Mussared', '$2a$04$9Fpdp.z4KsTWy/qe1h44Je1GitL2ypj5sFKI0L5yrqwn97OGS4clW');
   insert into users (id, first_name, last_name, pwd_hash) values (13, 'Cos', 'Parkey', '$2a$04$hJmEjOCfMIxzam8I0.eNFeEXq3m/6YicjgJ/Elk2pf6aUfnT2UFN6');
   insert into users (id, first_name, last_name, pwd_hash) values (14, 'Aeriell', 'Sturgess', '$2a$04$Z6e2vXdEZ9qvPODrWlxpfu08hj.c1GzcKQ8fF45f6qOvNf/5g1NY2');
   insert into users (id, first_name, last_name, pwd_hash) values (15, 'Tracey', 'Caen', '$2a$04$kno4/8X7nNvEYzz42Ls7U.Sw38beZ0NC8vqdMr5//DKQLNXHseDi.');
   insert into users (id, first_name, last_name, pwd_hash) values (16, 'Colby', 'Junifer', '$2a$04$jOnzMj13aNXxy0sf8cNTcutWN79.Clnzvisx2q6BkmZCfsmdI6Jkm');
   insert into users (id, first_name, last_name, pwd_hash) values (17, 'Phil', 'Dat', '$2a$04$TOcKyCRoC033Xvx0lsobmOjKicBTSPFy0z9LAXHaEVUrfSSBDGsiO');
   insert into users (id, first_name, last_name, pwd_hash) values (18, 'Carson', 'Wildber', '$2a$04$bg/nLZIYbjXKd8s2vmA4XuDf1tmJRBvxIu29jlud0Ik5EUmBmFMRq');
   insert into users (id, first_name, last_name, pwd_hash) values (19, 'Gerladina', 'Atwel', '$2a$04$ykLuyzUKqBHEt6cCcykUYuOfyplLo7fSqEEVO.NyfR8smBOkiVLFa');
   insert into users (id, first_name, last_name, pwd_hash) values (20, 'Carl', 'Ashard', '$2a$04$G6uRar9SvNWbna2mFDM9MucMV8cRFFs/mTORS1/sBOm0HLl7dLvsS');
   ```

---

## Step 2: Creating the Login Form

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
        <br>
        <label for="last_name">Last Name:</label>
        <input type="text" name="last_name" required>
        <br>
        <label for="password">Password:</label>
        <input type="password" name="password" required>
        <br>
        <button type="submit">Login</button>
    </form>
</body>
</html>
```

---

## Step 3: Setting Up the Node.js Project

1. Initialize the project:
   ```sh
   mkdir auth-mysql-workshop
   cd auth-mysql-workshop
   npm init -y
   ```
2. Install dependencies:
   ```sh
   npm install express mysql2 bcryptjs dotenv cors body-parser
   ```
3. Install TypeScript and types:
   ```sh
   npm install --save-dev typescript @types/node @types/express @types/bcryptjs
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

## Step 5: Implementing Authentication

1. Create `src/index.ts` and set up the authentication route:
   ```ts
   import express from 'express';
   import bcrypt from 'bcryptjs';
   import cors from 'cors';
   import bodyParser from 'body-parser';
   import pool from './config/db';

   const app = express();
   const PORT = 3000;

   app.use(cors());
   app.use(bodyParser.urlencoded({ extended: true }));
   app.use(express.static('public'));

   app.post('/login', async (req, res) => {
       const { first_name, last_name, password } = req.body;

       try {
           const [rows] = await pool.query(
               'SELECT * FROM users WHERE first_name = ? AND last_name = ?',
               [first_name, last_name]
           );

           if (Array.isArray(rows) && rows.length > 0) {
               const user = rows[0] as { pwd_hash: string };

               const passwordMatch = await bcrypt.compare(password, user.pwd_hash);
               if (passwordMatch) {
                   return res.send('You are logged in');
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

## Step 6: Running the Application

1. Compile TypeScript:
   ```sh
   npx tsc
   ```
2. Start the server:
   ```sh
   npm start
   ```
3. Open the browser and go to:
   ```
   http://localhost:3000
   ```
4. Enter the following credentials:
   - **First Name:** Ninnette
   - **Last Name:** Dilawey
   - **Password:** (the correct password from the database)

5. If authentication is successful, you should see:
   ```
   You are logged in
   ```

---

## Conclusion
Congratulations! 🎉 You have successfully:
- Set up a MySQL database with XAMPP
- Created a login form
- Implemented password authentication using bcrypt

### Next Steps
- Implement JWT authentication for session management
- Add password reset functionality
- Use an ORM like Prisma or Sequelize

Happy coding! 🚀