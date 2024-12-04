const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const projectRoutes = require('./routes/projectRoutes');
const epicRoutes = require('./routes/epicRoutes');
const storyRoutes = require('./routes/storyRoutes');
const taskRoutes = require('./routes/taskRouter');
const authRoutes = require('./routes/authRouter');
const userRoutes = require('./routes/userRoutes');
const app = express();

// Middlewares  
app.use(cors({
  origin: 'http://localhost:5173', // da acceso  a un dominio en especifico
  credentials: true,              // Si trabajo con cookies o autenticación
}));
app.use(express.json());

// Rutas
app.use('/projects', projectRoutes);
app.use('/epics', epicRoutes);
app.use('/stories', storyRoutes);
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
// Conexión a MongoDB y servidor
mongoose
  .connect(process.env.MONGOCONEXION)
  .then(() => {
    app.listen(process.env.PUERTO, () => {
      console.log(`Servidor corriendo en el puerto ${process.env.PUERTO}`);
    });
  })
  .catch((err) => console.error('Error al conectar a MongoDB', err));
