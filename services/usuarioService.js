// services/usuarioService.js
const Usuario = require('../models/usuario');
const UsuarioExistenteException = require('../exceptions/usuarioExistenteException');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Cadastrar Usuário
exports.cadastrarUsuario = async (usuarioData) => {
	const exists = await Usuario.findOne({ cpf: usuarioData.cpf });
	if (exists) {
		throw new UsuarioExistenteException('Já existe um usuário com esse CPF.');
	}

	// Criptografar a senha antes de salvar
	const salt = await bcrypt.genSalt(10);
	usuarioData.senha = await bcrypt.hash(usuarioData.senha, salt);

	const usuario = new Usuario(usuarioData);
	return await usuario.save();
};

// Login
exports.login = async (email, senha) => {
	const usuario = await Usuario.findOne({ email });
	if (usuario && (await bcrypt.compare(senha, usuario.senha))) {
		// Gerar um token JWT
		const token = jwt.sign(
			{ _id: usuario._id, email: usuario.email },
			process.env.JWT_SECRET,
			{ expiresIn: '1h' } // Token válido por 1 hora
		);

		return { usuario, token };
	}
	return null;
};

// Recuperar Senha
exports.recuperarSenha = async (cpf, novaSenha) => {
	const usuario = await Usuario.findOne({ cpf });
	if (usuario) {
		const salt = await bcrypt.genSalt(10);
		usuario.senha = await bcrypt.hash(novaSenha, salt);
		await usuario.save();
		return true;
	}
	return false;
};

// Função para listar todos os usuários
exports.listarTodosUsuarios = async () => {
	return await Usuario.find(); // Buscar todos os usuários no banco de dados
};

// Buscar usuário pelo ID
exports.obterPorId = async (id) => {
	return await Usuario.findById(id).select('-senha'); // Excluir a senha da resposta
};
