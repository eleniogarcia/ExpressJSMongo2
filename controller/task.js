// controller/task.js
const Task = require('../models/task'); // Asegúrate de tener un modelo de Task

// Obtener todas las tareas
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una tarea por ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva tarea
exports.createTask = async (req, res) => {
    const { title, description, start, end, status, geo } = req.body;

    // Verificar si se envió el objeto geo con lat y long
    if (!geo || !geo.lat || !geo.long) {
        return res.status(400).json({ message: 'geo.lat y geo.long son requeridos' });
    }

    const task = new Task({
        title,
        description,
        start,
        end,
        status,
        geo: {
            lat: geo.lat,
            long: geo.long
        }
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Actualizar una tarea por ID
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una tarea por ID
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json({ message: 'Tarea eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
