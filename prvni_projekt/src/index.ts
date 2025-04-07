import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
})

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Ahoj svete!');
})

app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})