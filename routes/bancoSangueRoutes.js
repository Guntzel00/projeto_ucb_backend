// routes/bancoSangueRoutes.js
const express = require('express');
const router = express.Router();
const BancoSangueController = require('../controllers/bancoSangueController');

router.get('/situacao', BancoSangueController.situacaoBancoSangue);

module.exports = router;
