import express from 'express';
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getDepartmentAnalytics
} from '../controllers/employeeController.js';
import { getDBStatus } from '../config/db.js';

const router = express.Router();

// Database Status Endpoint
router.get('/db-status', (req, res) => {
  res.status(200).json({ success: true, status: getDBStatus() });
});

// Aggregation Pipeline Analytics Route (Must come before :id route)
router.get('/analytics/overview', getDepartmentAnalytics);

// CRUD Routes
router.route('/')
  .get(getEmployees)
  .post(createEmployee);

router.route('/:id')
  .get(getEmployeeById)
  .put(updateEmployee)
  .delete(deleteEmployee);

export default router;
