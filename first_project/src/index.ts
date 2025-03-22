import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

interface User {
    id: number
    first_name: string
    last_name: string
}

let temp: User[] = [
    {id: 1, first_name: "Jan", last_name: "Soukeník"}
]

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});

app.get('/users', (req, res) => {
    res.json(temp)
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});