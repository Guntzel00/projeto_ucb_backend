// controllers/artigoController.js
const ArtigoService = require('../services/artigoService');

// Listar todos os artigos
exports.listarArtigos = async (req, res) => {
	try {
		const artigos = await ArtigoService.listarTodos();
		res.json(artigos);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Obter artigo por ID
exports.obterArtigoPorId = async (req, res) => {
	try {
		const artigo = await ArtigoService.obterPorId(req.params.id);
		if (!artigo) {
			return res.status(404).json({ message: 'Artigo não encontrado' });
		}
		res.json(artigo);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Criar um novo artigo
exports.criarArtigo = async (req, res) => {
	try {
		const novoArtigo = await ArtigoService.criar(req.body);
		res.status(201).json(novoArtigo);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Atualizar um artigo existente
exports.atualizarArtigo = async (req, res) => {
	try {
		const artigoAtualizado = await ArtigoService.atualizar(
			req.params.id,
			req.body
		);
		if (!artigoAtualizado) {
			return res.status(404).json({ message: 'Artigo não encontrado' });
		}
		res.json(artigoAtualizado);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Deletar um artigo
exports.deletarArtigo = async (req, res) => {
	try {
		const artigoDeletado = await ArtigoService.deletar(req.params.id);
		if (!artigoDeletado) {
			return res.status(404).json({ message: 'Artigo não encontrado' });
		}
		res.json({ message: 'Artigo deletado com sucesso' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
