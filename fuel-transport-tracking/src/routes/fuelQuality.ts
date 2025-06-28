
import { Router } from 'express';
import FuelQualityController from '../controllers/fuelQualityController.js';

const router = Router();

// GET /api/fuel-quality - Get all fuel quality tests
router.get('/', FuelQualityController.getAll);

// GET /api/fuel-quality/:id - Get fuel quality test by ID
router.get('/:id', FuelQualityController.getById);

// POST /api/fuel-quality - Create new fuel quality test
router.post('/', FuelQualityController.create);

// PUT /api/fuel-quality/:id - Update fuel quality test
router.put('/:id', FuelQualityController.update);

// DELETE /api/fuel-quality/:id - Delete fuel quality test
router.delete('/:id', FuelQualityController.remove);

export default router;
