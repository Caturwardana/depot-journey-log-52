
const express = require('express');
const DocumentsController = require('../controllers/documentsController');

const router = express.Router();

// GET /api/documents - Get all documents
router.get('/', DocumentsController.getAllDocuments);

// GET /api/documents/:id - Get document by ID
router.get('/:id', DocumentsController.getDocumentById);

// POST /api/documents - Create new document
router.post('/', DocumentsController.createDocument);

// PUT /api/documents/:id - Update document
router.put('/:id', DocumentsController.updateDocument);

// DELETE /api/documents/:id - Delete document
router.delete('/:id', DocumentsController.deleteDocument);

module.exports = router;
