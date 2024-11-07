// controllers/agendamentoController.js
const AgendamentoService = require('../services/agendamentoService');

exports.agendar = async (req, res) => {
  try {
    const agendamento = await AgendamentoService.agendarDoacao(req.body);
    res.json(agendamento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.listar = async (req, res) => {
  try {
    const agendamentos = await AgendamentoService.listarAgendamentosPorUsuario(req.params.idUsuario);
    res.json(agendamentos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
