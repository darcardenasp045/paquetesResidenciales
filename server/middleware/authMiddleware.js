import jwt from 'jsonwebtoken';

// Definir el secreto directamente en el código
const JWT_SECRET = 'tu_secreto_aqui'; // Reemplaza con tu secreto real

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado

  if (!token) {
    return res.status(403).json({ error: 'A token is required for authentication' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verificar el token usando la constante JWT_SECRET
    req.user = decoded; // Guardar la información del usuario en la petición
  } catch (error) {
    return res.status(401).json({ error: 'Invalid Token' });
  }

  return next(); // Continuar al siguiente middleware
};

