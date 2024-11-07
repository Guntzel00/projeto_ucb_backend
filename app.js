// app.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());

// Conectar ao MongoDB
connectDB();

// Configurar rotas
app.use('/api/agendamentos', require('./routes/agendamentoRoutes'));
app.use('/api/banco-sangue', require('./routes/bancoSangueRoutes'));
app.use('/api/exames', require('./routes/exameRoutes'));
app.use('/api/termo', require('./routes/termoDoacaoRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/centros-doacao', require('./routes/centroDoacaoRoutes')); // Nova rota para centros de doação

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
