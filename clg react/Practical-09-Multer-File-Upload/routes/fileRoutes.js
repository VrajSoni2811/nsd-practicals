import express from 'express';
import { upload } from '../config/multerConfig.js';
import {
  uploadSingle,
  uploadMultiple,
  getAllFiles,
  downloadFile,
  deleteFile,
  getStorageStats
} from '../controllers/fileController.js';
import { getDBStatus } from '../config/db.js';

const router = express.Router();

// System & Analytics Routes
router.get('/db-status', (req, res) => res.status(200).json({ success: true, status: getDBStatus() }));
router.get('/stats/storage', getStorageStats);

// Upload Routes
router.post('/upload', upload.single('file'), uploadSingle);
router.post('/upload-multiple', upload.array('files', 5), uploadMultiple);

// Listing & CRUD Routes
router.get('/', getAllFiles);
router.get('/:id/download', downloadFile);
router.delete('/:id', deleteFile);

export default router;
