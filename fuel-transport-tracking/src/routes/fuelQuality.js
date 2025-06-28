
const express = require('express');
const FuelQualityController = require('../controllers/fuelQualityController');

const router = express.Router();

// GET /api/fuelquality - Get all fuel quality tests
router.get('/', FuelQualityController.getAllFuelQualityTests);

// GET /api/fuelquality/:id - Get fuel quality test by ID
router.get('/:id', FuelQualityController.getFuelQualityTestById);

// POST /api/fuelquality - Create new fuel quality test
router.post('/', FuelQualityController.createFuelQualityTest);

// PUT /api/fuelquality/:id - Update fuel quality test
router.put('/:id', FuelQualityController.updateFuelQualityTest);

// DELETE /api/fuelquality/:id - Delete fuel quality test
router.delete('/:id', FuelQualityController.deleteFuelQualityTest);

module.exports = router;
