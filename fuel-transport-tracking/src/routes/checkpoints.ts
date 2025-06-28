
import { Router } from 'express';
import CheckpointsController from '../controllers/checkpointsController.js';

const router = Router();

// GET /api/checkpoints - Get all checkpoints
router.get('/', CheckpointsController.getAll);

// GET /api/checkpoints/:id - Get checkpoint by ID
router.get('/:id', CheckpointsController.getById);

// POST /api/checkpoints - Create new checkpoint
router.post('/', CheckpointsController.create);

// PUT /api/checkpoints/:id - Update checkpoint
router.put('/:id', CheckpointsController.update);

// DELETE /api/checkpoints/:id - Delete checkpoint
router.delete('/:id', CheckpointsController.remove);

export default router;
