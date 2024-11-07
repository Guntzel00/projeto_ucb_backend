// models/usuario.js
const mongoose = require('mongoose');

const EnderecoSchema = new mongoose.Schema({
  rua: String,
  numero: Number,
  complemento: String,
  bairro: String,
  cidade: String,
  estado: String,
  cep: String,
});

const UsuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  telefone: String,
  cpf: String,
  rg: String,
  dataNascimento: String,
  peso: Number,
  sexo: String,
  endereco: EnderecoSchema,
  tipoSanguineo: String,
  termoAssinado: Boolean
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
