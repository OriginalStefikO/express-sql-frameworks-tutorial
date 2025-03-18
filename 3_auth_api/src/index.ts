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