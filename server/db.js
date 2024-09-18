import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Crear una conexión a MySQL usando promesas
const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Verificar la conexión
try {
    await db.connect();
    console.log('Conectado a la base de datos MySQL');
} catch (error) {
    console.error('Error conectando a la base de datos:', error);
}

export default db;
