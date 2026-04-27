const { Categorias } = require('../models');

const categoriasController = {
  // GET /categorias - Listar todas
  getAll: async (req, res) => {
    try {
      const categorias = await Categorias.findAll();
      res.json({
        message: 'Categorías obtenidas exitosamente.',
        data: categorias
      });
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      res.status(500).json({ 
        message: 'Error al obtener categorías.', 
        error: error.message 
      });
    }
  },

  // POST /categorias - Crear
  create: async (req, res) => {
    try {
      const { nombre, descripcion } = req.body;

      // Validar campos requeridos
      if (!nombre) {
        return res.status(400).json({ 
          message: 'El nombre es requerido.' 
        });
      }

      const categoria = await Categorias.create({
        nombre,
        descripcion
      });

      res.status(201).json({
        message: 'Categoría creada exitosamente.',
        data: categoria
      });
    } catch (error) {
      console.error('Error al crear categoría:', error);
      res.status(500).json({ 
        message: 'Error al crear categoría.', 
        error: error.message 
      });
    }
  },

  // PUT /categorias/:id - Actualizar
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion } = req.body;

      // Buscar categoría
      const categoria = await Categorias.findByPk(id);
      if (!categoria) {
        return res.status(404).json({ 
          message: 'Categoría no encontrada.' 
        });
      }

      // Actualizar campos
      await categoria.update({
        nombre: nombre || categoria.nombre,
        descripcion: descripcion || categoria.descripcion
      });

      res.json({
        message: 'Categoría actualizada exitosamente.',
        data: categoria
      });
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
      res.status(500).json({ 
        message: 'Error al actualizar categoría.', 
        error: error.message 
      });
    }
  },

  // DELETE /categorias/:id - Eliminar
  remove: async (req, res) => {
    try {
      const { id } = req.params;

      // Buscar categoría
      const categoria = await Categorias.findByPk(id);
      if (!categoria) {
        return res.status(404).json({ 
          message: 'Categoría no encontrada.' 
        });
      }

      // Eliminar
      await categoria.destroy();

      res.json({
        message: 'Categoría eliminada exitosamente.'
      });
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      res.status(500).json({ 
        message: 'Error al eliminar categoría.', 
        error: error.message 
      });
    }
  }
};

module.exports = categoriasController;
