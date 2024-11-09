// services/centroDoacaoService.js
const CentroDoacao = require('../models/centroDoacao');

const criarCentro = async (dados) => {
	const centro = new CentroDoacao(dados);
	return await centro.save();
};

const listarCentros = async () => {
	return await CentroDoacao.find();
};

const buscarCentroPorId = async (id) => {
	return await CentroDoacao.findById(id);
};

const atualizarCentro = async (id, dados) => {
	return await CentroDoacao.findOneAndUpdate({ id }, dados, { new: true });
};

const deletarCentro = async (id) => {
	return await CentroDoacao.findOneAndDelete({ id });
};

module.exports = {
	criarCentro,
	listarCentros,
	buscarCentroPorId,
	atualizarCentro,
	deletarCentro,
};
