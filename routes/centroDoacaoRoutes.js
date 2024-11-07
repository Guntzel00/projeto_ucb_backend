// routes/centroDoacaoRoutes.js
const express = require('express');
const router = express.Router();
const centroDoacaoController = require('../controllers/centroDoacaoController');

router.post('/', centroDoacaoController.criarCentro);
router.get('/', centroDoacaoController.listarCentros);
router.get('/:id', centroDoacaoController.buscarCentroPorId);
router.put('/:id', centroDoacaoController.atualizarCentro);
router.delete('/:id', centroDoacaoController.deletarCentro);

module.exports = router;
