import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

// Registro de usuario
export const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (existingUser.length > 0) {
            return res.status(400).send('Usuario ya existe');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

        res.status(201).send('Usuario registrado');
    } catch (err) {
        res.status(500).send(err);
    }
};

// Login de usuario
export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (users.length === 0) {
            return res.status(400).send('Usuario no encontrado');
        }

        const user = users[0];
        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) return res.status(400).send('Contraseña incorrecta');

        const token = jwt.sign({ id: user.id }, 'secreto_para_token', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send(err);
    }
};
