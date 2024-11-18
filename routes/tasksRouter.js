const express = require('express'); 
const router = express.Router();
const taskController = require('../controller/task'); // Corregir la importación
const { authMiddleware } = require('../middlewar/authMiddleware');

router.get('/', authMiddleware, taskController.getAllTasks);
router.get('/:id', authMiddleware, taskController.getTaskById);
router.post('/', authMiddleware, taskController.createTask);
router.put('/:id', authMiddleware, taskController.updateTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;