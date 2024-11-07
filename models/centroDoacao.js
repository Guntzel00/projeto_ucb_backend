// models/centroDoacao.js
const mongoose = require('mongoose');

// Definir o esquema para os centros de doação
const CentroDoacaoSchema = new mongoose.Schema({
	id: Number,
	nome: String,
	link_localizacao: String,
	endereco: String,
	telefone: String,
});

// Exportar o modelo "CentroDoacao"
module.exports = mongoose.model('CentroDoacao', CentroDoacaoSchema);
