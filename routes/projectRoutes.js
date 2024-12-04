const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const {
  getAllProjects,
  getOneProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

const router = express.Router();

router.get('/user/:userID', authMiddleware, getAllProjects);
router.get('/:id', authMiddleware, getOneProject);
router.post('/', authMiddleware, createProject);
router.put('/:id', authMiddleware, updateProject);
router.delete('/:id', authMiddleware, deleteProject);

module.exports = router;
