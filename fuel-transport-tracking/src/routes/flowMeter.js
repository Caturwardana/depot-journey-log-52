
const express = require('express');
const FlowMeterController = require('../controllers/flowMeterController');

const router = express.Router();

// GET /api/flowmeter - Get all flow meter readings
router.get('/', FlowMeterController.getAllFlowMeterReadings);

// GET /api/flowmeter/:id - Get flow meter reading by ID
router.get('/:id', FlowMeterController.getFlowMeterReadingById);

// POST /api/flowmeter - Create new flow meter reading
router.post('/', FlowMeterController.createFlowMeterReading);

// PUT /api/flowmeter/:id - Update flow meter reading
router.put('/:id', FlowMeterController.updateFlowMeterReading);

// DELETE /api/flowmeter/:id - Delete flow meter reading
router.delete('/:id', FlowMeterController.deleteFlowMeterReading);

module.exports = router;
