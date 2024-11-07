// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');

router.post('/cadastrar', UsuarioController.cadastrar);
router.post('/login', UsuarioController.login);
router.post('/recuperar-senha', UsuarioController.recuperarSenha);

module.exports = router;
