import express from 'express';
import authRoutes from './routes/authRoutes.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import packageRoutes from './routes/packageRoutes.js'; 

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

app.use('/api/packages', packageRoutes); // Agrega esta línea

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
