const express = require('express');
const router = express.Router();
const mueblesController = require('../controllers/mueblesController');
const authMiddleware = require('../middlewares/authMiddleware');

// Aplicar middleware JWT a todas las rutas
router.use(authMiddleware);

// GET /muebles - Listar todos los muebles
router.get('/', mueblesController.getAll);

// POST /muebles - Crear nuevo mueble
router.post('/', mueblesController.create);

// PUT /muebles/:id - Actualizar mueble
router.put('/:id', mueblesController.update);

// DELETE /muebles/:id - Eliminar mueble
router.delete('/:id', mueblesController.remove);

module.exports = router;
