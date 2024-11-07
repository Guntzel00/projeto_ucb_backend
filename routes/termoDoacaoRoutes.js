// routes/termoDoacaoRoutes.js
const express = require('express');
const router = express.Router();
const TermoDoacaoController = require('../controllers/termoDoacaoController');
const multer = require('multer');
const upload = multer();

router.post('/upload', upload.single('file'), TermoDoacaoController.uploadTermo);

module.exports = router;
