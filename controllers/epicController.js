const Epic = require('../models/Epic');

const getEpicsByProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const epics = await Epic.find({ project: projectId });
    res.json(epics);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener épicas' });
  }
};

const getOneEpic = async (req, res) => {
  const { projectId, epicId } = req.params; // Usamos projectId y epicId
  try {
    // Convertimos los parámetros a ObjectId, en caso de que sean cadenas
    const epic = await Epic.findOne({ 
      _id: epicId,           // Buscamos por el ID de la épica
      project: projectId     // Aseguramos que la épica esté asociada al proyecto
    });

    if (!epic) {
      return res.status(404).json({ error: 'Épica no encontrada' });
    }

    res.json(epic);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la épica' });
  }
};

const createEpic = async (req, res) => {
  const { project, name, description, icon } = req.body;

  try {
    const epic = new Epic({ project, name, description, icon });
    await epic.save();
    res.status(201).json(epic);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear épica' });
  }
};

const updateEpic = async (req, res) => {
  const { id } = req.params;
  const { project, name, description, icon } = req.body;

  try {
    const epic = await Epic.findByIdAndUpdate(
      id,
      { project, name, description, icon },
      { new: true }
    );
    if (!epic) return res.status(404).json({ error: 'Épica no encontrada' });
    res.json(epic);
  } catch (error) {
    res.status(400).json({ error: 'Error al editar épica' });
  }
};

const deleteEpic = async (req, res) => {
  const { id } = req.params;

  try {
    const epic = await Epic.findByIdAndDelete(id);
    if (!epic) return res.status(404).json({ error: 'Épica no encontrada' });
    res.json({ message: 'Épica eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar épica' });
  }
};

module.exports = {
  getEpicsByProject,
  getOneEpic,
  createEpic,
  updateEpic,
  deleteEpic,
};
