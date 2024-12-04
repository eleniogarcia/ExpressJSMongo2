const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  getStoriesByEpic,
  getOneStory,
  getAllStories,
  createStory,
  updateStory,
  deleteStory,
} = require('../controllers/storyController');

const router = express.Router();

router.get('/epic/:epicId', authMiddleware, getStoriesByEpic);
router.get('/:id', authMiddleware, getOneStory);
router.get('/user/:userID', authMiddleware, getAllStories);
router.post('/', authMiddleware, createStory);
router.put('/:id', authMiddleware, updateStory);
router.delete('/:id', authMiddleware, deleteStory);

module.exports = router;
