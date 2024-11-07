// controllers/bancoSangueController.js
const SituacaoBancoSangue = require('../models/situacaoBancoSangue');

exports.situacaoBancoSangue = (req, res) => {
	const situacoes = [
		new SituacaoBancoSangue('A+', 30, 1),
		new SituacaoBancoSangue('A-', 40, 2),
		new SituacaoBancoSangue('B+', 20, 3),
		new SituacaoBancoSangue('B-', 35, 4),
		new SituacaoBancoSangue('AB+', 25, 5),
		new SituacaoBancoSangue('AB-', 15, 6),
		new SituacaoBancoSangue('O+', 50, 7),
		new SituacaoBancoSangue('O-', 60, 8),
	];
	res.json(situacoes);
};
