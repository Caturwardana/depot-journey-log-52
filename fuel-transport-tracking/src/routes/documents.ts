
import { Router } from 'express';
import DocumentsController from '../controllers/documentsController.js';

const router = Router();

// GET /api/documents - Get all documents
router.get('/', DocumentsController.getAll);

// GET /api/documents/:id - Get document by ID
router.get('/:id', DocumentsController.getById);

// POST /api/documents - Create new document
router.post('/', DocumentsController.create);

// PUT /api/documents/:id - Update document
router.put('/:id', DocumentsController.update);

// DELETE /api/documents/:id - Delete document
router.delete('/:id', DocumentsController.remove);

export default router;
