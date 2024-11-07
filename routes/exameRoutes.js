// routes/exameRoutes.js
const express = require('express');
const router = express.Router();
const ExameController = require('../controllers/exameController');
const multer = require('multer');
const upload = multer();  // Configurar para armazenamento real no futuro

router.post('/upload', upload.single('file'), ExameController.uploadExame);

module.exports = router;
