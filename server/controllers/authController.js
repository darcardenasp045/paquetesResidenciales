import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

// Registro de usuario
export const register = (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, result) => {
        if (err) return res.status(500).send(err);

        if (result.length > 0) {
            return res.status(400).send('Usuario ya existe');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(insertQuery, [username, hashedPassword], (err) => {
            if (err) return res.status(500).send(err);

            res.status(201).send('Usuario registrado');
        });
    });
};

// Login de usuario
export const login = (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, result) => {
        if (err) return res.status(500).send(err);

        if (result.length === 0) {
            return res.status(400).send('Usuario no encontrado');
        }

        const user = result[0];
        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) return res.status(400).send('Contraseña incorrecta');

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
};
