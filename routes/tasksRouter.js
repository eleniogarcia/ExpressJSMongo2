const express = require('express');
const router = express.Router();
const taskController = require('../controller/task'); // Asegúrate de que la ruta sea correcta

// Ruta para obtener todas las tareas
router.get('/', taskController.getAllTasks);

// Ruta para obtener una tarea por ID
router.get('/:id', taskController.getTaskById);

// Ruta para crear una nueva tarea
router.post('/', taskController.createTask);

// Ruta para actualizar una tarea por ID
router.put('/:id', taskController.updateTask);

// Ruta para eliminar una tarea por ID
router.delete('/:id', taskController.deleteTask);

module.exports = router;
