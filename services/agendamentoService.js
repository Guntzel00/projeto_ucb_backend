// services/agendamentoService.js
const Agendamento = require('../models/agendamento');

exports.agendarDoacao = async (data) => {
	const agendamento = new Agendamento(data);
	return await agendamento.save();
};

exports.listarAgendamentosPorUsuario = async (idUsuario) => {
	return await Agendamento.find({ idUsuario });
};
