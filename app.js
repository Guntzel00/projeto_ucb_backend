require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // Importar o CORS

// Iniciar a aplicação Express
const app = express();

// Habilitar CORS para todas as requisições
app.use(cors());

// Middleware para interpretar JSON
app.use(express.json());

// Conectar ao MongoDB
connectDB();

// Configurar rotas
app.use('/api/agendamentos', require('./routes/agendamentoRoutes'));
app.use('/api/banco-sangue', require('./routes/bancoSangueRoutes'));
app.use('/api/exames', require('./routes/exameRoutes'));
app.use('/api/termo', require('./routes/termoDoacaoRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/centros-doacao', require('./routes/centroDoacaoRoutes')); // Rota para centros de doação
app.use('/api/artigos', require('./routes/artigoRoutes'));

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT} 🚀`));
