// controllers/termoDoacaoController.js
exports.uploadTermo = (req, res) => {
	if (!req.file) {
		return res.status(400).json({ message: 'Arquivo não enviado.' });
	}
	res.json({ message: 'Termo de doação enviado com sucesso.' });
};
