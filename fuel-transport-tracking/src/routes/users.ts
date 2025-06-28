
import { Router } from 'express';
import UsersController from '../controllers/usersController.js';

const router = Router();

// GET /api/users - Get all users
router.get('/', UsersController.getAll);

// GET /api/users/:id - Get user by ID
router.get('/:id', UsersController.getById);

// POST /api/users - Create new user
router.post('/', UsersController.create);

// PUT /api/users/:id - Update user
router.put('/:id', UsersController.update);

// DELETE /api/users/:id - Delete user
router.delete('/:id', UsersController.remove);

export default router;
