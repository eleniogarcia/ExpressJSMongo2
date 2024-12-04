const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  getTasksByStory,
  createTask,
  updateTask,
  updateStatusTask,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

router.get('/story/:storyId', authMiddleware, getTasksByStory);
router.post('/', authMiddleware, createTask);
router.put('/:id', authMiddleware, updateTask);
router.patch('/:id', authMiddleware, updateStatusTask);
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
