// controllers/exameController.js
exports.uploadExame = (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "Arquivo não enviado." });
    }
    res.json({ message: "Exame enviado com sucesso." });
  };
  