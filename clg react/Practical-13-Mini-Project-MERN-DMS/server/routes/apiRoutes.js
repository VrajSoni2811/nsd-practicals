import express from 'express';
import { upload } from '../config/multerConfig.js';
import {
  getDocuments,
  uploadDocument,
  downloadDocument,
  updateDocument,
  deleteDocument,
  getDmsAnalytics
} from '../controllers/documentController.js';
import { getAuditLogs } from '../controllers/auditController.js';
import { getDBStatus } from '../config/db.js';

const router = express.Router();

// System & Analytics Routes
router.get('/db-status', (req, res) => res.status(200).json({ success: true, status: getDBStatus() }));
router.get('/analytics/overview', getDmsAnalytics);
router.get('/audit-logs', getAuditLogs);

// Document CRUD & Upload Routes
router.get('/', getDocuments);
router.post('/upload', upload.single('file'), uploadDocument);
router.get('/:id/download', downloadDocument);
router.put('/:id', updateDocument);
router.delete('/:id', deleteDocument);

export default router;
