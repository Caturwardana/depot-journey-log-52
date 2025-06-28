
const express = require('express');
const UsersController = require('../controllers/usersController');

const router = express.Router();

// GET /api/users - Get all users
router.get('/', UsersController.getAllUsers);

// GET /api/users/:id - Get user by ID
router.get('/:id', UsersController.getUserById);

// POST /api/users - Create new user
router.post('/', UsersController.createUser);

// PUT /api/users/:id - Update user
router.put('/:id', UsersController.updateUser);

// DELETE /api/users/:id - Delete user
router.delete('/:id', UsersController.deleteUser);

// POST /api/users/login - User login
router.post('/login', UsersController.login);

module.exports = router;
