const Task = require('../models/task');

const getTasksByStory = async (req, res) => {
  const { storyId } = req.params;
  try {
    const tasks = await Task.find({ story: storyId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
};

const createTask = async (req, res) => {
  const { story, name, description, status, dueDate } = req.body;  
  try {
    const task = new Task({ story, name, description, status, dueDate });  
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear tarea' });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, description, status, due } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { name, description, status, due },
      { new: true }
    );
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: 'Error al editar tarea' });
  }
};

const updateStatusTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { done } = req.body; // Se espera que 'done' sea un booleano

    // Validar que el 'done' sea un valor booleano
    if (typeof done !== 'boolean') {
      return res.status(400).json({ message: "El campo 'done' debe ser un valor booleano." });
    }

    const task = await Task.findByIdAndUpdate(
      taskId,
      { done }, // Actualizamos el campo 'done'
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar el estado de la tarea' });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar tarea' });
  }
};

module.exports = {
  getTasksByStory,
  createTask,
  updateTask,
  updateStatusTask,
  deleteTask,
};
