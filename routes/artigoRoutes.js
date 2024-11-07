// routes/artigoRoutes.js
const express = require('express');
const router = express.Router();
const ArtigoController = require('../controllers/artigoController');

// Listar todos os artigos
router.get('/', ArtigoController.listarArtigos);

// Obter um artigo por ID
router.get('/:id', ArtigoController.obterArtigoPorId);

// Criar um novo artigo
router.post('/', ArtigoController.criarArtigo);

// Atualizar um artigo existente
router.put('/:id', ArtigoController.atualizarArtigo);

// Deletar um artigo
router.delete('/:id', ArtigoController.deletarArtigo);

module.exports = router;
