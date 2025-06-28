
import { Router } from 'express';
import DepotsController from '../controllers/depotsController.js';

const router = Router();

// GET /api/depots - Get all depots
router.get('/', DepotsController.getAll);

// GET /api/depots/:id - Get depot by ID
router.get('/:id', DepotsController.getById);

// POST /api/depots - Create new depot
router.post('/', DepotsController.create);

// PUT /api/depots/:id - Update depot
router.put('/:id', DepotsController.update);

// DELETE /api/depots/:id - Delete depot
router.delete('/:id', DepotsController.remove);

export default router;
