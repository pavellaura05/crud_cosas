const { User } = require('../models');

const usuariosController = {
  // GET /usuarios - Listar todos los usuarios
  getAll: async (req, res) => {
    try {
      const usuarios = await User.findAll({
        attributes: { exclude: ['password'] } // No mostrar contraseña
      });
      res.json({
        message: 'Usuarios obtenidos exitosamente.',
        data: usuarios
      });
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ 
        message: 'Error al obtener usuarios.', 
        error: error.message 
      });
    }
  },

  // POST /usuarios - Crear usuario (alternativo a /auth/register)
  create: async (req, res) => {
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

      const usuario = await User.create({
        nombre,
        email,
        password,
        rol: rol || 'user'
      });

      res.status(201).json({
        message: 'Usuario creado exitosamente.',
        data: {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol
        }
      });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ 
        message: 'Error al crear usuario.', 
        error: error.message 
      });
    }
  },

  // PUT /usuarios/:id - Actualizar usuario
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, email, rol } = req.body;

      // Buscar usuario
      const usuario = await User.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ 
          message: 'Usuario no encontrado.' 
        });
      }

      // Actualizar campos
      await usuario.update({
        nombre: nombre || usuario.nombre,
        email: email || usuario.email,
        rol: rol || usuario.rol
      });

      res.json({
        message: 'Usuario actualizado exitosamente.',
        data: {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol
        }
      });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({ 
        message: 'Error al actualizar usuario.', 
        error: error.message 
      });
    }
  },

  // DELETE /usuarios/:id - Eliminar usuario
  remove: async (req, res) => {
    try {
      const { id } = req.params;

      // Buscar usuario
      const usuario = await User.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ 
          message: 'Usuario no encontrado.' 
        });
      }

      // Eliminar
      await usuario.destroy();

      res.json({
        message: 'Usuario eliminado exitosamente.'
      });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({ 
        message: 'Error al eliminar usuario.', 
        error: error.message 
      });
    }
  }
};

module.exports = usuariosController;
