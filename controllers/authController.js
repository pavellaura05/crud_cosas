const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_jwt_seguro';
const JWT_EXPIRES_IN = '24h';

const authController = {
  // Registro de usuario
  register: async (req, res) => {
    try {
      const { nombre, email, password, rol } = req.body;

      // Validar campos requeridos
      if (!nombre || !email || !password) {
        return res.status(400).json({ 
          message: 'Nombre, email y password son requeridos.' 
        });
      }

      // Verificar si el email ya existe
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ 
          message: 'El email ya está registrado.' 
        });
      }

      // Hash de la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Crear usuario
      const user = await User.create({
        nombre,
        email,
        password: hashedPassword,
        rol: rol || 'user'
      });

      // Generar token
      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email, 
          rol: user.rol 
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      res.status(201).json({
        message: 'Usuario registrado exitosamente.',
        token,
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol
        }
      });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ 
        message: 'Error al registrar usuario.', 
        error: error.message 
      });
    }
  },

  // Login de usuario
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validar campos requeridos
      if (!email || !password) {
        return res.status(400).json({ 
          message: 'Email y password son requeridos.' 
        });
      }

      // Buscar usuario por email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ 
          message: 'Credenciales inválidas.' 
        });
      }

      // Verificar contraseña
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ 
          message: 'Credenciales inválidas.' 
        });
      }

      // Generar token
      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email, 
          rol: user.rol 
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      res.json({
        message: 'Login exitoso.',
        token,
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol
        }
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ 
        message: 'Error al iniciar sesión.', 
        error: error.message 
      });
    }
  }
};

module.exports = authController;
