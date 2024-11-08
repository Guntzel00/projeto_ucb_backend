const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/cadastrar', usuarioController.cadastrar);
router.post('/login', usuarioController.login);
router.post('/recuperar-senha', usuarioController.recuperarSenha);

// Rotas protegidas - Requer autenticação
router.get('/listar', authMiddleware, usuarioController.listarUsuarios);
router.get('/me', authMiddleware, usuarioController.obterUsuario);

module.exports = router;
