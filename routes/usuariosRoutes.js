const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const authMiddleware = require('../middlewares/authMiddleware');

// Aplicar middleware JWT a todas las rutas
router.use(authMiddleware);

// GET /usuarios - Listar todos los usuarios
router.get('/', usuariosController.getAll);

// POST /usuarios - Crear nuevo usuario (alternativo a /auth/register)
router.post('/', usuariosController.create);

// PUT /usuarios/:id - Actualizar usuario
router.put('/:id', usuariosController.update);

// DELETE /usuarios/:id - Eliminar usuario
router.delete('/:id', usuariosController.remove);

module.exports = router;
