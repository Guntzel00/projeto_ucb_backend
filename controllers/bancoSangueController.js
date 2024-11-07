// controllers/bancoSangueController.js
const SituacaoBancoSangue = require('../models/situacaoBancoSangue');

exports.situacaoBancoSangue = (req, res) => {
  const situacoes = [
    new SituacaoBancoSangue("A+", 30),
    new SituacaoBancoSangue("A-", 40),
    new SituacaoBancoSangue("B+", 20),
    new SituacaoBancoSangue("O-", 50)
  ];
  res.json(situacoes);
};
