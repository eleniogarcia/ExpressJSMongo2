const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  getEpicsByProject,
  getOneEpic,
  createEpic,
  updateEpic,
  deleteEpic,
} = require('../controllers/epicController');

const router = express.Router();

router.get('/project/:projectId', authMiddleware, getEpicsByProject);
router.get('/project/:projectId/epic/:epicId', authMiddleware, getOneEpic);
router.post('/', authMiddleware, createEpic);
router.put('/:id', authMiddleware, updateEpic);
router.delete('/:id', authMiddleware, deleteEpic);

module.exports = router;
