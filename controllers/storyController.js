const Story = require('../models/Story');

const getStoriesByEpic = async (req, res) => {
  const { epicId } = req.params;

  try {
    const stories = await Story.find({ epic: epicId });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historias' });
  }
};

const getAllStories = async (req, res) => {
  const userID = req.user._id;  // Obtenemos el userId del usuario autenticado
  
  try {
    // Buscamos las historias que pertenecen al usuario
    const stories = await Story.find({ owner: userID }).populate('epic', 'name');  // Puedes también poblar la épica si quieres información adicional
    res.status(200).json({
      status: 'success',
      data: stories,  // Enviamos las historias al cliente
    });
  } catch (error) {
    console.error('Error al obtener todas las historias:', error);
    res.status(500).json({
      status: 'fail',
      message: 'Error al obtener las historias',
      details: error.message,
    });
  }
};

const getOneStory = async (req, res) => {
  const { id } = req.params; // Extraemos el ID de la historia desde los parámetros de la URL
  try {
    // Buscamos la historia por su ID único
    const story = await Story.findById(id);
    // Si no encontramos la historia, devolvemos un error 404
    if (!story) {
      return res.status(404).json({ error: 'Historia no encontrada' });
    }
    // Si encontramos la historia, la devolvemos como respuesta
    res.json(story);
  } catch (error) {
    // Si ocurre un error, devolvemos un estado 500
    console.error('Error al obtener la historia:', error);
    res.status(500).json({ error: 'Error al obtener la historia' });
  }
};

const createStory = async (req, res) => {
  const { epic, name, description, owner, assignedTo, points, due, status, icon } = req.body;
  try {
    const story = new Story({ epic, name, description, owner, assignedTo, points, due, status, icon });
    await story.save();
    res.status(201).json(story);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear historia' });
  }
};

const updateStory = async (req, res) => {
  const { id } = req.params;
  const { name, description, owner, assignedTo, points, due, status, icon } = req.body;
  try {
    const story = await Story.findByIdAndUpdate(
      id,
      { name, description, owner, assignedTo, points, due, status, icon },
      { new: true }
    );
    if (!story) return res.status(404).json({ error: 'Historia no encontrada' });
    res.json(story);
  } catch (error) {
    res.status(400).json({ error: 'Error al editar historia' });
  }
};

const deleteStory = async (req, res) => {
  const { id } = req.params;
  try {
    const story = await Story.findByIdAndDelete(id);
    if (!story) return res.status(404).json({ error: 'Historia no encontrada' });
    res.json({ message: 'Historia eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar historia' });
  }
};

module.exports = {
  getStoriesByEpic,
  getAllStories,
  getOneStory,
  createStory,
  updateStory,
  deleteStory,
};
