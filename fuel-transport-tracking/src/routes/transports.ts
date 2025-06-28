
import { Router } from 'express';
import TransportsController from '../controllers/transportsController.js';

const router = Router();

// GET /api/transports - Get all transports
router.get('/', TransportsController.getAll);

// GET /api/transports/:id - Get transport by ID
router.get('/:id', TransportsController.getById);

// POST /api/transports - Create new transport
router.post('/', TransportsController.create);

// PUT /api/transports/:id - Update transport
router.put('/:id', TransportsController.update);

// DELETE /api/transports/:id - Delete transport
router.delete('/:id', TransportsController.remove);

export default router;
