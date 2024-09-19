import express from 'express';
import { getAllPackages, createPackage } from '../controllers/packageController.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // Asegúrate de tener esta función

const router = express.Router();

// Ruta para crear un nuevo paquete (solo para usuarios autenticados)
router.post('/', verifyToken, createPackage);

// Ruta para obtener todos los paquetes (solo para usuarios autenticados)
router.get('/', verifyToken, getAllPackages);

export default router;
