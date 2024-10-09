const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PUERTO || 3002;

// Middleware para manejar JSON
app.use(express.json());

// Importar las rutas
const tasksRouter = require("./routes/tasksRouter");
app.use("/tasks", tasksRouter);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Hello!');
});

// Conectar a MongoDB
mongoose.connect(process.env.MONGOCONEXION)
    .then(() => {
        console.log("Conectado a MongoDB");
        app.listen(port, () => {
            console.log(`Servidor escuchando en el puerto ${port}`);
        });
    })
    .catch((error) => {
        console.error("Error de conexión:", error);
    });
