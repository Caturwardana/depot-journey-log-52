
const express = require('express');
const DepotsController = require('../controllers/depotsController');

const router = express.Router();

// GET /api/depots - Get all depots
router.get('/', DepotsController.getAllDepots);

// GET /api/depots/:id - Get depot by ID
router.get('/:id', DepotsController.getDepotById);

// POST /api/depots - Create new depot
router.post('/', DepotsController.createDepot);

// PUT /api/depots/:id - Update depot
router.put('/:id', DepotsController.updateDepot);

// DELETE /api/depots/:id - Delete depot
router.delete('/:id', DepotsController.deleteDepot);

module.exports = router;
