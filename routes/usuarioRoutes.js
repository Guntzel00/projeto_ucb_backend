const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/cadastrar', usuarioController.cadastrar);
router.post('/login', usuarioController.login);
router.post('/recuperar-senha', UsuarioController.recuperarSenha);

module.exports = router;
