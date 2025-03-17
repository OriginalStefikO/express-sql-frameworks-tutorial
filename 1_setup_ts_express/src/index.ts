import express from "express";
import { Request, Response } from "express";
import errorHandler from './middleware/errorHandler';

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON request bodies


interface User {
  id: number;
  name: string;
}

let users: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

// Get all users
app.get("/users", (req: Request, res: Response) => {
  res.json(users);
});

// Create a new user
app.post("/users", (req: Request, res: Response) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

interface UserParams {
  id: string; // Or number, depending on how you want to handle it.
}

// app.get('/users/:id', (req: Request<UserParams>, res: Response) => {
//   const user = users.find((u) => u.id === Number(req.params.id));
//   if (!user) {
//     res.status(404).json({ message: "User not found" });
//     return;
//   }
//   res.json(user);
// })

app.get('/users/:id', (req: Request<UserParams>, res: Response) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) {
    throw new Error("User not found");
  }
  res.json(user);
})


// Delete user by ID
app.delete("/users/:id", (req: Request, res: Response) => {
  users = users.filter((u) => u.id !== Number(req.params.id));
  res.json({ message: "User deleted" });
});

app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
