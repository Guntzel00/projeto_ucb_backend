// services/usuarioService.js
const nodemailer = require('nodemailer');
const Usuario = require('../models/usuario');
const UsuarioExistenteException = require('../exceptions/usuarioExistenteException');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Função para gerar um código de recuperação de 4 dígitos
function gerarCodigoRecuperacao() {
	return Math.floor(1000 + Math.random() * 9000); // Gera um número aleatório de 4 dígitos
}

// Função para enviar o código de recuperação por e-mail
async function enviarEmailRecuperacao(email, codigoRecuperacao) {
	const transporter = nodemailer.createTransport({
		service: 'Gmail', // Configure o serviço de e-mail desejado
		auth: {
			user: process.env.EMAIL_USER, // Defina seu e-mail no .env
			pass: process.env.EMAIL_PASS, // Defina sua senha no .env
		},
	});

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: email,
		subject: 'Código de Recuperação de Senha',
		text: `Seu código de recuperação é: ${codigoRecuperacao}`, // Conteúdo do e-mail
	};

	await transporter.sendMail(mailOptions);
}

// Função para cadastrar um novo usuário
exports.cadastrarUsuario = async (usuarioData) => {
	const exists = await Usuario.findOne({ cpf: usuarioData.cpf });
	if (exists) {
		throw new UsuarioExistenteException('Já existe um usuário com esse CPF.');
	}

	// Gera o código de recuperação e adiciona ao usuário
	usuarioData.codigoRecuperacao = gerarCodigoRecuperacao();
	const usuario = new Usuario(usuarioData);

	// Envia o código de recuperação por e-mail
	await enviarEmailRecuperacao(usuario.email, usuarioData.codigoRecuperacao);

	return await usuario.save();
};

// Função para login do usuário
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

// Função para atualizar a senha do usuário usando o CPF
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

// Função para gerar um novo código de recuperação e enviá-lo por e-mail
exports.gerarNovoCodigoRecuperacao = async (email) => {
	const usuario = await Usuario.findOne({ email });
	if (!usuario) return null;

	usuario.codigoRecuperacao = gerarCodigoRecuperacao();
	await usuario.save();
	await enviarEmailRecuperacao(email, usuario.codigoRecuperacao);

	return usuario;
};

// Função para verificar se o código de recuperação está correto
exports.verificarCodigoRecuperacao = async (email, codigoRecuperacao) => {
	const usuario = await Usuario.findOne({ email, codigoRecuperacao });
	return !!usuario;
};

// Função para atualizar a senha do usuário usando o código de recuperação
exports.atualizarSenha = async (email, novaSenha) => {
	const usuario = await Usuario.findOne({ email });
	if (usuario) {
		// Criptografar a nova senha
		const salt = await bcrypt.genSalt(10);
		usuario.senha = await bcrypt.hash(novaSenha, salt);

		// Opcionalmente, remova o código de recuperação após o uso
		usuario.codigoRecuperacao = null;
		
		// Salva o usuário com a nova senha
		await usuario.save();
		
		// Gerar um novo token JWT após a atualização da senha
		const token = jwt.sign(
			{ _id: usuario._id, email: usuario.email },
			process.env.JWT_SECRET,
			{ expiresIn: '1h' } // Token válido por 1 hora
		);

		// Retornar o token junto com a confirmação de sucesso
		return { success: true, token };
	}
	
	// Retorna falso se o usuário não foi encontrado
	return { success: false };
};
