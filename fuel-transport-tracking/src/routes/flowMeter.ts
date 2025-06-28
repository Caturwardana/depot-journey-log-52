
import { Router } from 'express';
import FlowMeterController from '../controllers/flowMeterController.js';

const router = Router();

// GET /api/flow-meter - Get all flow meter readings
router.get('/', FlowMeterController.getAll);

// GET /api/flow-meter/:id - Get flow meter reading by ID
router.get('/:id', FlowMeterController.getById);

// POST /api/flow-meter - Create new flow meter reading
router.post('/', FlowMeterController.create);

// PUT /api/flow-meter/:id - Update flow meter reading
router.put('/:id', FlowMeterController.update);

// DELETE /api/flow-meter/:id - Delete flow meter reading
router.delete('/:id', FlowMeterController.remove);

export default router;
