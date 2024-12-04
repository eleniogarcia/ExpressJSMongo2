const Project = require('../models/Project');



const getAllProjects = async (req, res) => {
  const userID = req.user._id;
  try {
    const projects = await Project.find({ members: userID }).populate('members', 'username email');
    res.status(200).json({
      status: 'success',
      data: projects,
    });
  } catch (error) {
    console.error('Error al obtener los proyectos:', error);
    res.status(500).json({
      status: 'fail',
      message: 'Error al obtener los proyectos',
      details: error.message,
    });
  }
};


const getOneProject = async (req, res) => {
  const { id } = req.params; // Extraer el ID del proyecto de los parámetros de la solicitud
  try {
    // Buscar el proyecto por su ID y hacer populate de los miembros
    const project = await Project.findById(id).populate('members', 'username email');

    // Si no se encuentra el proyecto, devolver un error 404
    if (!project) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    // Devolver el proyecto encontrado
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el proyecto' });
  }
};


const createProject = async (req, res) => {
  const { name, members, description, icon } = req.body;

  try {
    const project = new Project({ name, members, description, icon });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear proyecto' });
  }
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, members, description, icon } = req.body;

  try {
    const project = await Project.findByIdAndUpdate(
      id,
      { name, members, description, icon },
      { new: true }
    );
    if (!project) return res.status(404).json({ error: 'Proyecto no encontrado' });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: 'Error al editar proyecto' });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) return res.status(404).json({ error: 'Proyecto no encontrado' });
    res.json({ message: 'Proyecto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar proyecto' });
  }
};

module.exports = {
  getAllProjects,
  getOneProject,
  createProject,
  updateProject,
  deleteProject,

};
