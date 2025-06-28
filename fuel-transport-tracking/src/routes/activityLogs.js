
const express = require('express');
const ActivityLogsController = require('../controllers/activityLogsController');

const router = express.Router();

// GET /api/activitylogs - Get all activity logs
router.get('/', ActivityLogsController.getAllActivityLogs);

// GET /api/activitylogs/:id - Get activity log by ID
router.get('/:id', ActivityLogsController.getActivityLogById);

// POST /api/activitylogs - Create new activity log
router.post('/', ActivityLogsController.createActivityLog);

// PUT /api/activitylogs/:id - Update activity log
router.put('/:id', ActivityLogsController.updateActivityLog);

// DELETE /api/activitylogs/:id - Delete activity log
router.delete('/:id', ActivityLogsController.deleteActivityLog);

module.exports = router;
