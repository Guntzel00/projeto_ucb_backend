// controllers/usuarioController.js
const UsuarioService = require('../services/usuarioService');
const UsuarioExistenteException = require('../exceptions/usuarioExistenteException');

exports.cadastrar = async (req, res) => {
  try {
    const novoUsuario = await UsuarioService.cadastrarUsuario(req.body);
    res.json(novoUsuario);
  } catch (error) {
    if (error instanceof UsuarioExistenteException) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Erro inesperado" });
  }
};

exports.login = async (req, res) => {
  try {
    const usuario = await UsuarioService.login(req.body.email, req.body.senha);
    if (!usuario) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.recuperarSenha = async (req, res) => {
  try {
    const sucesso = await UsuarioService.recuperarSenha(req.body.cpf, req.body.novaSenha);
    if (sucesso) {
      res.json({ message: "Senha alterada com sucesso." });
    } else {
      res.status(404).json({ message: "Usuário não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao alterar a senha." });
  }
};
