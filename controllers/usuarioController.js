// controllers/usuarioController.js
const UsuarioService = require('../services/usuarioService');
const UsuarioExistenteException = require('../exceptions/usuarioExistenteException');
const usuario = require('../models/usuario');

exports.cadastrar = async (req, res) => {
	try {
		const novoUsuario = await UsuarioService.cadastrarUsuario(req.body);
		res.status(201).json(novoUsuario);
	} catch (error) {
		console.error('Erro ao cadastrar usuário:', error); // Adicione esta linha para ver o erro no console
		if (error instanceof UsuarioExistenteException) {
			return res.status(400).json({ message: error.message });
		}
		res.status(500).json({ message: 'Erro inesperado ao cadastrar usuário.' });
	}
};

// Login
exports.login = async (req, res) => {
	try {
		const loginData = await UsuarioService.login(
			req.body.email,
			req.body.senha
		);
		if (!loginData) {
			return res.status(401).json({ message: 'Credenciais inválidas' });
		}

		// Retornar o token JWT para o cliente
		res.json({
			message: 'Login bem-sucedido',
			usuario: loginData.usuario,
			token: loginData.token,
		});
	} catch (error) {
		res.status(500).json({ message: 'Erro inesperado ao realizar login.' });
	}
};

exports.recuperarSenha = async (req, res) => {
	try {
		const sucesso = await UsuarioService.recuperarSenha(
			req.body.cpf,
			req.body.novaSenha
		);
		if (sucesso) {
			res.json({ message: 'Senha alterada com sucesso.' });
		} else {
			res.status(404).json({ message: 'Usuário não encontrado.' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Erro ao alterar a senha.' });
	}
};

// Controlador para listar todos os usuários
exports.listarUsuarios = async (req, res) => {
	try {
		const usuarios = await UsuarioService.listarTodosUsuarios();
		res.json(usuarios);
	} catch (error) {
		res.status(500).json({ message: 'Erro inesperado ao listar usuários.' });
	}
};

// Obter informações do usuário autenticado
exports.obterUsuario = async (req, res) => {
	try {
		const usuarioId = req.user._id; // Obtém o ID do usuário a partir do token

		const usuario = await UsuarioService.obterPorId(usuarioId);

		if (!usuario) {
			return res.status(404).json({ message: 'Usuário não encontrado' });
		}

		// Retorna todos os campos solicitados, incluindo `id`, `cep` e `endereco`
		res.json({
			id: usuario._id,
			nome: usuario.nome,
			sobrenome: usuario.sobrenome,
			email: usuario.email,
			telefone: usuario.telefone,
			cpf: usuario.cpf,
			rg: usuario.rg,
			dataNascimento: usuario.dataNascimento,
			peso: usuario.peso,
			sexo: usuario.sexo,
			endereco: usuario.endereco,
			cep: usuario.cep,
			// Inclua outros campos necessários, exceto dados sensíveis, como senha
		});
	} catch (error) {
		res.status(500).json({ message: 'Erro ao buscar informações do usuário.' });
	}
};

exports.solicitarCodigoRecuperacao = async (req, res) => {
	try {
		const usuario = await UsuarioService.gerarNovoCodigoRecuperacao(
			req.body.email
		);
		if (usuario) {
			res.json({ message: 'Código de recuperação enviado por e-mail.' });
		} else {
			res.status(404).json({ message: 'Usuário não encontrado.' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Erro ao solicitar código de recuperação.' });
	}
};

exports.verificarCodigoRecuperacao = async (req, res) => {
	try {
		const { email, codigoRecuperacao } = req.body;
		const valido = await UsuarioService.verificarCodigoRecuperacao(
			email,
			codigoRecuperacao
		);
		if (valido) {
			res.json({ message: 'Código válido. Prossiga para alterar a senha.' });
		} else {
			res.status(400).json({ message: 'Código de recuperação inválido.' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Erro ao verificar código de recuperação.' });
	}
};

exports.redefinirSenha = async (req, res) => {
	try {
		const { email, novaSenha } = req.body;
		const sucesso = await UsuarioService.atualizarSenha(email, novaSenha);
		if (sucesso) {
			res.json({ message: 'Senha alterada com sucesso.' });
		} else {
			res.status(404).json({ message: 'Usuário não encontrado.' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Erro ao redefinir a senha.' });
	}
};

// Atualizar informações do usuário
exports.atualizarUsuario = async (req, res) => {
	try {
		const usuarioId = req.user._id; // ID do usuário autenticado via token
		const atualizacaoData = req.body;

		// Atualizar o usuário com base no _id autenticado
		const usuarioAtualizado = await UsuarioService.atualizarUsuario(usuarioId, atualizacaoData);

		if (!usuarioAtualizado) {
			return res.status(404).json({ message: 'Usuário não encontrado' });
		}

		res.json({ message: 'Usuário atualizado com sucesso', usuario: usuarioAtualizado });
	} catch (error) {
		res.status(500).json({ message: 'Erro ao atualizar informações do usuário.' });
	}
};

