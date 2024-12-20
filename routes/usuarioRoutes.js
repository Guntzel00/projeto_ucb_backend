const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Rotas públicas
router.post('/cadastrar', usuarioController.cadastrar);
router.post('/login', usuarioController.login);
router.post('/recuperar-senha', usuarioController.recuperarSenha);
router.post('/recuperar-senha/solicitar', usuarioController.solicitarCodigoRecuperacao);
router.post('/recuperar-senha/verificar', usuarioController.verificarCodigoRecuperacao);
router.post('/recuperar-senha/redefinir', usuarioController.redefinirSenha);

// Rotas protegidas - Requer autenticação
router.get('/listar', authMiddleware, usuarioController.listarUsuarios);
router.get('/me', authMiddleware, usuarioController.obterUsuario);

// Nova rota para atualizar informações do usuário autenticado
router.put('/:id', authMiddleware, usuarioController.atualizarUsuario);

module.exports = router;
