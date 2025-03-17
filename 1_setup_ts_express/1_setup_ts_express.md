# Workshop: TypeScript and Node.js - Building a Basic Backend with Express

## Workshop Overview
In this workshop, you will learn how to set up a **TypeScript** and **Node.js** project and build a simple backend using **Express**. This hands-on session will cover:

- Setting up a TypeScript and Node.js environment
- Configuring TypeScript for a backend project
- Creating an Express server with TypeScript
- Implementing basic API routes
- Using middleware and handling errors

---

## Prerequisites
- Basic knowledge of JavaScript and Node.js
- Node.js and npm installed (https://nodejs.org/)
- A code editor (VS Code recommended)

---

## Step 1: Project Setup

1. Create a new project directory and navigate into it:
   ```sh
   mkdir ts-node-express-workshop
   cd ts-node-express-workshop
   ```
2. Install typescript global
   ```sh
   npm install -g typescript
   ```

3. Initialize a **Node.js** project:
   ```sh
   npm init -y
   ```

4. Install TypeScript and necessary dependencies:
   ```sh
   npm install --save-dev typescript ts-node @types/node @types/express nodemon express
   ```

5. Generate a **tsconfig.json** file:
   ```sh
   npx tsc --init
   ```

6. Update **tsconfig.json** with the following settings:
   ```json
   {
     "compilerOptions": {
       "target": "es6",
       "module": "commonjs",
       "outDir": "./dist",
       "rootDir": "./src",
       "strict": true
     }
   }
   ```

---

## Step 2: Creating the Express Server

1. Create a `src` directory and an `index.ts` file inside it:
   ```sh
   mkdir src
   touch src/index.ts
   ```

2. Open `src/index.ts` and add the following code:
   ```ts
   import express from 'express';

   const app = express();
   const PORT = process.env.PORT || 3000;

   app.use(express.json());

   app.get('/', (req, res) => {
       res.send('Hello, TypeScript with Express!');
   });

   app.listen(PORT, () => {
       console.log(`Server running on http://localhost:${PORT}`);
   });
   ```

3. Add a **start script** in `package.json`:
   ```json
   "scripts": {
     "start": "npx tsc && node dist/index.js",
     "dev": "nodemon src/index.ts"
   }
   ```

4. Run the server:
   ```sh
   npm run dev
   ```

5. Open a browser or use Postman to access `http://localhost:3000/`. You should see **"Hello, TypeScript with Express!"**.

---

## Step 3: Creating API Routes

Modify `src/index.ts` to include basic routes:

```ts
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Sample Data
let users = [{ id: 1, name: 'John Doe' }];

// Get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Create a new user
app.post('/users', (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Get user by ID
app.get('/users/:id', (req: Request<UserParams>, res: Response) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json(user);
})

// Delete user by ID
app.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.id !== Number(req.params.id));
    res.json({ message: 'User deleted' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## Step 4: Handling Errors and Middleware

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

app.get('/users/:id', (req: Request<UserParams>, res: Response) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) {
    throw new Error("User not found");
  }
  res.json(user);
})
```

---

## Conclusion
Congratulations! 🎉 You have successfully set up a **TypeScript + Node.js** backend with **Express**. You learned:

- How to set up TypeScript with Node.js
- How to create an Express server
- How to build API routes and handle errors

You can expand this further by adding database support (MongoDB, PostgreSQL, etc.), authentication, or more features!

---

## Next Steps
- Connect to a database (MongoDB, PostgreSQL, MySQL)
- Implement authentication (JWT, OAuth)
- Add unit tests with Jest

Happy coding! 🚀

