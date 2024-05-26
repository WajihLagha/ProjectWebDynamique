
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const initialDb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '' 
});

initialDb.connect(err => {
    if (err) throw err;
    console.log('Initial database connection established...');

    initialDb.query("ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY ''", (err, result) => {
        if (err) throw err;
        console.log('Authentication method changed...');

        initialDb.end();

        const db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '', 
            database: 'mydb'
        });

        db.connect(err => {
            if (err) throw err;
            console.log('Database connected...');
        });

        const secret = 'mysecretkey';

        const verifyToken = (req, res, next) => {
            const token = req.headers['authorization'];
            if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

            jwt.verify(token.split(' ')[1], secret, (err, decoded) => {
                if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                req.userId = decoded.id;
                next();
            });
        };

        app.post('/register', (req, res) => {
            const { username, password } = req.body;
            const hashedPassword = bcrypt.hashSync(password, 8);
            const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
            db.query(sql, [username, hashedPassword], (err, result) => {
                if (err) return res.status(500).send('Server error.');
                res.status(200).send({ message: 'User registered successfully!' });
            });
        });

        app.post('/login', (req, res) => {
            const { username, password } = req.body;
            const sql = 'SELECT * FROM users WHERE username = ?';
            db.query(sql, [username], (err, results) => {
                if (err) return res.status(500).send('Server error.');
                if (results.length === 0) return res.status(404).send('User not found.');
                const passwordIsValid = bcrypt.compareSync(password, results[0].password);
                if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
                const token = jwt.sign({ id: results[0].id }, secret, { expiresIn: 86400 });
                res.status(200).send({ auth: true, token });
            });
        });

        app.post('/posts', verifyToken, (req, res) => {
            const { title, content, category } = req.body;
            const userId = req.userId;
            const sql = 'INSERT INTO posts (title, content, category, userId) VALUES (?, ?, ?, ?)';
            db.query(sql, [title, content, category, userId], (err, result) => {
                if (err) return res.status(500).send('Server error.');
                res.status(200).send({ message: 'Post created successfully!' });
            });
        });

        app.get('/posts', (req, res) => {
            const sql = 'SELECT * FROM posts';
            db.query(sql, (err, results) => {
                if (err) return res.status(500).send('Server error.');
                res.status(200).send(results);
            });
        });

        app.put('/posts/:id', verifyToken, (req, res) => {
            const { title, content, category } = req.body;
            const sql = 'UPDATE posts SET title = ?, content = ?, category = ? WHERE id = ?';
            db.query(sql, [title, content, category, req.params.id], (err, result) => {
                if (err) return res.status(500).send('Server error.');
                res.status(200).send({ message: 'Post updated successfully!' });
            });
        });

        app.delete('/posts/:id', verifyToken, (req, res) => {
            const sql = 'DELETE FROM posts WHERE id = ?';
            db.query(sql, [req.params.id], (err, result) => {
                if (err) return res.status(500).send('Server error.');
                res.status(200).send({ message: 'Post deleted successfully!' });
            });
        });

        const port = 3000;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    });
});
