const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasController');
const authMiddleware = require('../middlewares/authMiddleware');

// Aplicar middleware JWT a todas las rutas
router.use(authMiddleware);

// GET /categorias - Listar todas las categorías
router.get('/', categoriasController.getAll);

// POST /categorias - Crear nueva categoría
router.post('/', categoriasController.create);

// PUT /categorias/:id - Actualizar categoría
router.put('/:id', categoriasController.update);

// DELETE /categorias/:id - Eliminar categoría
router.delete('/:id', categoriasController.remove);

module.exports = router;
