// models/usuario.js
const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
	nome: String,
	sobrenome: String,
	email: String,
	senha: String,
	telefone: String,
	cpf: String,
	rg: String,
	dataNascimento: String,
	peso: Number,
	sexo: String,
	endereco: String,
	cep: String,
	codigoRecuperacao: Number, // Adicionado para recuperação de senha
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
