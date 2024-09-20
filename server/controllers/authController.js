import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const JWT_SECRET = 'tu_secreto_aqui'; // Define aquí tu secreto

// Controlador de registro
export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Asegúrate de obtener solo el primer resultado en la consulta
    const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

    if (users.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Genera el token JWT
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // Configura la cookie del token
    res.cookie('token', token, {
      httpOnly: true,   // La cookie no es accesible desde JavaScript del cliente
      secure: process.env.NODE_ENV === 'production',  // Usa secure solo en producción (con HTTPS)
      maxAge: 3600000,  // Expira en 1 hora
      sameSite: 'strict'  // Mejora la seguridad en la transmisión
    });

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
