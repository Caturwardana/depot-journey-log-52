
const express = require('express');
const TerminalsController = require('../controllers/terminalsController');

const router = express.Router();

// GET /api/terminals - Get all terminals
router.get('/', TerminalsController.getAllTerminals);

// GET /api/terminals/:id - Get terminal by ID
router.get('/:id', TerminalsController.getTerminalById);

// POST /api/terminals - Create new terminal
router.post('/', TerminalsController.createTerminal);

// PUT /api/terminals/:id - Update terminal
router.put('/:id', TerminalsController.updateTerminal);

// DELETE /api/terminals/:id - Delete terminal
router.delete('/:id', TerminalsController.deleteTerminal);

module.exports = router;
