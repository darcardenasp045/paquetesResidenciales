import express from 'express';
import mysql from 'mysql2/promise';
import authRoutes from './routes/authRoutes.js';

// Configuración de la base de datos
const DB_CONFIG = {
    host: 'localhost',
    user: 'root',  // Reemplaza con tu usuario de MySQL
    password: '',  // Reemplaza con tu contraseña de MySQL
    database: 'paquetesresidenciales'  // Reemplaza con el nombre de tu base de datos
};

// Crear la conexión a MySQL
const db = await mysql.createConnection(DB_CONFIG);

try {
    console.log('Conectando a la base de datos...');
    await db.connect();
    console.log('Conectado a la base de datos MySQL');
} catch (error) {
    console.error('Error conectando a la base de datos:', error);
}

const app = express();
app.use(express.json());

// Usar las rutas de autenticación
app.use('/api/auth', authRoutes);

// Iniciar el servidor en el puerto 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
