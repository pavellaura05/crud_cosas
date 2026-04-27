const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /auth/register - Registro de usuario
router.post('/register', authController.register);

// POST /auth/login - Login de usuario
router.post('/login', authController.login);

module.exports = router;
