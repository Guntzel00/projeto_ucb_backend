// controllers/centroDoacaoController.js
const centroDoacaoService = require('../services/centroDoacaoService');

// Criar um novo centro de doação
const criarCentro = async (req, res) => {
    try {
        const centro = await centroDoacaoService.criarCentro(req.body);
        res.status(201).json(centro);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar centro de doação' });
    }
};

// Listar todos os centros de doação
const listarCentros = async (req, res) => {
    try {
        const centros = await centroDoacaoService.listarCentros();
        res.status(200).json(centros);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar centros de doação' });
    }
};

// Buscar um centro de doação por ID
const buscarCentroPorId = async (req, res) => {
    try {
        const centro = await centroDoacaoService.buscarCentroPorId(req.params.id);
        if (!centro) {
            return res.status(404).json({ error: 'Centro de doação não encontrado' });
        }
        res.status(200).json(centro);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar centro de doação' });
    }
};

// Atualizar um centro de doação por ID
const atualizarCentro = async (req, res) => {
    try {
        const centro = await centroDoacaoService.atualizarCentro(req.params.id, req.body);
        if (!centro) {
            return res.status(404).json({ error: 'Centro de doação não encontrado' });
        }
        res.status(200).json(centro);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar centro de doação' });
    }
};

// Deletar um centro de doação por ID
const deletarCentro = async (req, res) => {
    try {
        const centro = await centroDoacaoService.deletarCentro(req.params.id);
        if (!centro) {
            return res.status(404).json({ error: 'Centro de doação não encontrado' });
        }
        res.status(200).json({ message: 'Centro de doação deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar centro de doação' });
    }
};

module.exports = {
    criarCentro,
    listarCentros,
    buscarCentroPorId,
    atualizarCentro,
    deletarCentro
};
