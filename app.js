const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const mueblesRoutes = require('./routes/mueblesRoutes');
const categoriasRoutes = require('./routes/categoriasRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const path = require('path');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/auth', authRoutes);
app.use('/muebles', mueblesRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/usuarios', usuariosRoutes);

// Ruta principal - servir frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor', error: err.message });
});

module.exports = app;
