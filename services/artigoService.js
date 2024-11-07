// services/artigoService.js
const Artigo = require('../models/artigo');

// Listar todos os artigos
exports.listarTodos = async () => {
	try {
		return await Artigo.find();
	} catch (error) {
		throw new Error('Erro ao listar artigos: ' + error.message);
	}
};

// Obter artigo por ID
exports.obterPorId = async (id) => {
	try {
		return await Artigo.findById(id);
	} catch (error) {
		throw new Error('Erro ao buscar artigo por ID: ' + error.message);
	}
};

// Criar um novo artigo
exports.criar = async (dados) => {
	try {
		const artigo = new Artigo(dados);
		return await artigo.save();
	} catch (error) {
		throw new Error('Erro ao criar artigo: ' + error.message);
	}
};

// Atualizar um artigo existente
exports.atualizar = async (id, dados) => {
	try {
		return await Artigo.findByIdAndUpdate(id, dados, { new: true });
	} catch (error) {
		throw new Error('Erro ao atualizar artigo: ' + error.message);
	}
};

// Deletar um artigo
exports.deletar = async (id) => {
	try {
		return await Artigo.findByIdAndDelete(id);
	} catch (error) {
		throw new Error('Erro ao deletar artigo: ' + error.message);
	}
};
