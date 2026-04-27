const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    const parts = authHeader.split(' ');
    
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Formato de token inválido. Use: Bearer <token>' });
    }

    const token = parts[1];
    const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_jwt_seguro';

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado.' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido.' });
    }
    return res.status(401).json({ message: 'Error de autenticación.', error: error.message });
  }
};

module.exports = authMiddleware;
