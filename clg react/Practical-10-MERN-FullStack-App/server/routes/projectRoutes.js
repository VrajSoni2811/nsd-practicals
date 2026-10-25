import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectAnalytics
} from '../controllers/projectController.js';
import { getDBStatus } from '../config/db.js';

const router = express.Router();

router.get('/db-status', (req, res) => res.status(200).json({ success: true, status: getDBStatus() }));
router.get('/analytics/summary', getProjectAnalytics);

router.route('/')
  .get(getProjects)
  .post(createProject);

router.route('/:id')
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);

export default router;
