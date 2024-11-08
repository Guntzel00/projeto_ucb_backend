const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/cadastrar', usuarioController.cadastrar);
router.post('/login', usuarioController.login);
router.post('/recuperar-senha/solicitar', usuarioController.solicitarCodigoRecuperacao);
router.post('/recuperar-senha/verificar', usuarioController.verificarCodigoRecuperacao);
router.post('/recuperar-senha/redefinir', usuarioController.redefinirSenha);

module.exports = router;
