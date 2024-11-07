// models/agendamento.js
const mongoose = require('mongoose');

const AgendamentoSchema = new mongoose.Schema({
  idUsuario: String,
  idCentroDoacao: String,
  data: String,
  hora: String,
  local: String,
  status: String,
  hemograma: String
});

module.exports = mongoose.model('Agendamento', AgendamentoSchema);
