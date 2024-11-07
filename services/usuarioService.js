// services/usuarioService.js
const Usuario = require('../models/usuario');
const UsuarioExistenteException = require('../exceptions/usuarioExistenteException');

exports.cadastrarUsuario = async (usuarioData) => {
  const exists = await Usuario.findOne({ cpf: usuarioData.cpf });
  if (exists) {
    throw new UsuarioExistenteException("Já existe um usuário com esse CPF.");
  }
  const usuario = new Usuario(usuarioData);
  return await usuario.save();
};

exports.login = async (email, senha) => {
  const usuario = await Usuario.findOne({ email });
  if (usuario && usuario.senha === senha) {
    return usuario;
  }
  return null;
};

exports.recuperarSenha = async (cpf, novaSenha) => {
  const usuario = await Usuario.findOne({ cpf });
  if (usuario) {
    usuario.senha = novaSenha;
    await usuario.save();
    return true;
  }
  return false;
};
