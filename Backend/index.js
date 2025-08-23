const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./BD/db');
const authRoutes = require('./BD/auth');
const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.static('../Frontend'));

// Rutas de la API
app.use('/api/auth', authRoutes);

// Ruta para servir la página principal (login)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend', 'login.html'));
});

// Ruta para login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend', 'login.html'));
});

// Ruta para registro  
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend', 'registro.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));