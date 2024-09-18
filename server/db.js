import mysql from 'mysql2/promise';

// Configuración de la base de datos (mismo que en app.js)
const DB_CONFIG = {
    host: 'localhost',
    user: 'root',  // Reemplaza con tu usuario de MySQL
    password: '',  // Reemplaza con tu contraseña de MySQL
    database: 'paquetesresidenciales'  // Reemplaza con el nombre de tu base de datos
};

// Crear la conexión a MySQL
const db = await mysql.createConnection(DB_CONFIG);

// Verificar la conexión
try {
    console.log('Conectando a la base de datos...');
    await db.connect();
    console.log('Conectado a la base de datos MySQL');
} catch (error) {
    console.error('Error conectando a la base de datos:', error);
}

export default db;
