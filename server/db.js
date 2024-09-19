import mysql from 'mysql2/promise'

const DB_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'paquetesresidenciales',
};

const db = mysql.createPool(DB_CONFIG); // Usamos un pool de conexiones

export default db;
