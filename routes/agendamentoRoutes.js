// routes/agendamentoRoutes.js
const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controllers/agendamentoController');

router.post('/agendar', AgendamentoController.agendar);
router.get('/:idUsuario', AgendamentoController.listar);

module.exports = router;
