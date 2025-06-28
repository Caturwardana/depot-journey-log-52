
const express = require('express');
const CheckpointsController = require('../controllers/checkpointsController');

const router = express.Router();

// GET /api/checkpoints - Get all checkpoints
router.get('/', CheckpointsController.getAllCheckpoints);

// GET /api/checkpoints/:id - Get checkpoint by ID
router.get('/:id', CheckpointsController.getCheckpointById);

// POST /api/checkpoints - Create new checkpoint
router.post('/', CheckpointsController.createCheckpoint);

// PUT /api/checkpoints/:id - Update checkpoint
router.put('/:id', CheckpointsController.updateCheckpoint);

// DELETE /api/checkpoints/:id - Delete checkpoint
router.delete('/:id', CheckpointsController.deleteCheckpoint);

module.exports = router;
