// models/artigo.js
const mongoose = require('mongoose');

// Definir o esquema para os artigos
const ArtigoSchema = new mongoose.Schema({
	id: Number,
	titulo: String,
	conteudo: String,
	resumo: String,
	url_imagem: String,
	desc_imagem: String,
});

// Exportar o modelo "Artigo"
module.exports = mongoose.model('Artigo', ArtigoSchema);
