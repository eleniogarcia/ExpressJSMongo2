const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();

const port = process.env.PUERTO || 3001;
// Middleware para parsear JSON
app.use(express.json());

// Rutas
const tasksRouter = require('./routes/tasksRouter');
const authRouter = require('./routes/authRouter');

app.use('/tasks', tasksRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('API funcionando');
});

mongoose.connect(process.env.MONGOCONEXION)
  .then(() => {
    console.log(`Conectado a MongoDB y servidor corriendo en el puerto ${port}`);
    app.listen(port, () => {
      console.log(`Servidor corriendo en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });

