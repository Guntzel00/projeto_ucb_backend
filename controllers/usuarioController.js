// controllers/usuarioController.js
const UsuarioService = require('../services/usuarioService');
const UsuarioExistenteException = require('../exceptions/usuarioExistenteException');

exports.cadastrar = async (req, res) => {
	try {
		const novoUsuario = await UsuarioService.cadastrarUsuario(req.body);
		res.status(201).json(novoUsuario);
	} catch (error) {
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
		// O `req.user` é adicionado pelo `authMiddleware`
		const usuarioId = req.user._id;

		// Consultar o banco de dados pelo ID do usuário
		const usuario = await UsuarioService.obterPorId(usuarioId);

		if (!usuario) {
			return res.status(404).json({ message: 'Usuário não encontrado' });
		}

		// Retornar os dados do usuário, exceto a senha
		res.json({
			_id: usuario._id,
			nome: usuario.nome,
			email: usuario.email,
			cpf: usuario.cpf,
			telefone: usuario.telefone,
			dataNascimento: usuario.dataNascimento,
			// Inclua outros campos necessários, exceto dados sensíveis, como senha
		});
	} catch (error) {
		res.status(500).json({ message: 'Erro ao buscar informações do usuário.' });
	}
};
