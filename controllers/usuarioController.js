// controllers/usuarioController.js
const UsuarioService = require('../services/usuarioService');
const UsuarioExistenteException = require('../exceptions/usuarioExistenteException');

exports.cadastrar = async (req, res) => {
  try {
    const novoUsuario = await UsuarioService.cadastrarUsuario(req.body);
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error); // Adicione esta linha para ver o erro no console
    if (error instanceof UsuarioExistenteException) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Erro inesperado ao cadastrar usuário." });
  }
};

exports.login = async (req, res) => {
  try {
    const usuario = await UsuarioService.login(req.body.email, req.body.senha);
    if (!usuario) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }
    res.json({ message: "Login bem-sucedido", usuario });
  } catch (error) {
    res.status(500).json({ message: "Erro inesperado ao realizar login." });
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

exports.solicitarCodigoRecuperacao = async (req, res) => {
  try {
    const usuario = await UsuarioService.gerarNovoCodigoRecuperacao(req.body.email);
    if (usuario) {
      res.json({ message: "Código de recuperação enviado por e-mail." });
    } else {
      res.status(404).json({ message: "Usuário não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao solicitar código de recuperação." });
  }
};

exports.verificarCodigoRecuperacao = async (req, res) => {
  try {
    const { email, codigoRecuperacao } = req.body;
    const valido = await UsuarioService.verificarCodigoRecuperacao(email, codigoRecuperacao);
    if (valido) {
      res.json({ message: "Código válido. Prossiga para alterar a senha." });
    } else {
      res.status(400).json({ message: "Código de recuperação inválido." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao verificar código de recuperação." });
  }
};

exports.redefinirSenha = async (req, res) => {
  try {
    const { email, novaSenha } = req.body;
    const sucesso = await UsuarioService.atualizarSenha(email, novaSenha);
    if (sucesso) {
      res.json({ message: "Senha alterada com sucesso." });
    } else {
      res.status(404).json({ message: "Usuário não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao redefinir a senha." });
  }
};
