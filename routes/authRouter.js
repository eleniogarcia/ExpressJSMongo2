const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/authController');

// Ruta para registro de usuario
router.post('/register', register);

// Ruta para login de usuario
router.post('/login', login);

module.exports = router;
