
import { Router } from 'express';
import TerminalsController from '../controllers/terminalsController.js';

const router = Router();

// GET /api/terminals - Get all terminals
router.get('/', TerminalsController.getAll);

// GET /api/terminals/:id - Get terminal by ID
router.get('/:id', TerminalsController.getById);

// POST /api/terminals - Create new terminal
router.post('/', TerminalsController.create);

// PUT /api/terminals/:id - Update terminal
router.put('/:id', TerminalsController.update);

// DELETE /api/terminals/:id - Delete terminal
router.delete('/:id', TerminalsController.remove);

export default router;
