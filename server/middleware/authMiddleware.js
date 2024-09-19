import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado

  if (!token) {
    return res.status(403).json({ error: 'A token is required for authentication' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardar la información del usuario en la petición
  } catch (error) {
    return res.status(401).json({ error: 'Invalid Token' });
  }
  
  return next(); // Continuar al siguiente middleware
};
