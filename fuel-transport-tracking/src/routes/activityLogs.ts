
import { Router } from 'express';
import ActivityLogsController from '../controllers/activityLogsController.js';

const router = Router();

// GET /api/activity-logs - Get all activity logs
router.get('/', ActivityLogsController.getAll);

// GET /api/activity-logs/:id - Get activity log by ID
router.get('/:id', ActivityLogsController.getById);

// POST /api/activity-logs - Create new activity log
router.post('/', ActivityLogsController.create);

// PUT /api/activity-logs/:id - Update activity log
router.put('/:id', ActivityLogsController.update);

// DELETE /api/activity-logs/:id - Delete activity log
router.delete('/:id', ActivityLogsController.remove);

export default router;
