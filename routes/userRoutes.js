const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getOneUser);
router.post('/',  createUser);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

module.exports = router;
