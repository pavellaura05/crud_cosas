const { Muebles } = require('../models');

const mueblesController = {
  // GET /muebles - Listar todos
  getAll: async (req, res) => {
    try {
      const muebles = await Muebles.findAll();
      res.json({
        message: 'Muebles obtenidos exitosamente.',
        data: muebles
      });
    } catch (error) {
      console.error('Error al obtener muebles:', error);
      res.status(500).json({ 
        message: 'Error al obtener muebles.', 
        error: error.message 
      });
    }
  },

  // POST /muebles - Crear
  create: async (req, res) => {
    try {
      const { nombre, tipo, costo } = req.body;

      // Validar campos requeridos
      if (!nombre) {
        return res.status(400).json({ 
          message: 'El nombre es requerido.' 
        });
      }

      const mueble = await Muebles.create({
        nombre,
        tipo,
        costo
      });

      res.status(201).json({
        message: 'Mueble creado exitosamente.',
        data: mueble
      });
    } catch (error) {
      console.error('Error al crear mueble:', error);
      res.status(500).json({ 
        message: 'Error al crear mueble.', 
        error: error.message 
      });
    }
  },

  // PUT /muebles/:id - Actualizar
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, tipo, costo } = req.body;

      // Buscar mueble
      const mueble = await Muebles.findByPk(id);
      if (!mueble) {
        return res.status(404).json({ 
          message: 'Mueble no encontrado.' 
        });
      }

      // Actualizar campos
      await mueble.update({
        nombre: nombre || mueble.nombre,
        tipo: tipo || mueble.tipo,
        costo: costo || mueble.costo
      });

      res.json({
        message: 'Mueble actualizado exitosamente.',
        data: mueble
      });
    } catch (error) {
      console.error('Error al actualizar mueble:', error);
      res.status(500).json({ 
        message: 'Error al actualizar mueble.', 
        error: error.message 
      });
    }
  },

  // DELETE /muebles/:id - Eliminar
  remove: async (req, res) => {
    try {
      const { id } = req.params;

      // Buscar mueble
      const mueble = await Muebles.findByPk(id);
      if (!mueble) {
        return res.status(404).json({ 
          message: 'Mueble no encontrado.' 
        });
      }

      // Eliminar
      await mueble.destroy();

      res.json({
        message: 'Mueble eliminado exitosamente.'
      });
    } catch (error) {
      console.error('Error al eliminar mueble:', error);
      res.status(500).json({ 
        message: 'Error al eliminar mueble.', 
        error: error.message 
      });
    }
  }
};

module.exports = mueblesController;
