import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

// Controlador de registro
export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validar si el usuario ya existe
    const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar el usuario en la base de datos
    await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Controlador de login
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si el usuario existe
    const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

    if (user.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user[0].password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Crear el token JWT
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Expiración de 1 hora
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
