
const express = require('express');
const TransportsController = require('../controllers/transportsController');

const router = express.Router();

// GET /api/transports - Get all transports
router.get('/', TransportsController.getAllTransports);

// GET /api/transports/:id - Get transport by ID
router.get('/:id', TransportsController.getTransportById);

// POST /api/transports - Create new transport
router.post('/', TransportsController.createTransport);

// PUT /api/transports/:id - Update transport
router.put('/:id', TransportsController.updateTransport);

// DELETE /api/transports/:id - Delete transport
router.delete('/:id', TransportsController.deleteTransport);

// PATCH /api/transports/:id/status - Update transport status
router.patch('/:id/status', TransportsController.updateTransportStatus);

module.exports = router;
