import express from 'express';
import authRoutes from './routes/authRoutes.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import packageRoutes from './routes/packageRoutes.js';

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:4321', // Reemplaza con tu origen
  credentials: true, // Permitir el envío de credenciales (cookies, headers de autorización, etc.)
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de paquetes
app.use('/api/packages', packageRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});