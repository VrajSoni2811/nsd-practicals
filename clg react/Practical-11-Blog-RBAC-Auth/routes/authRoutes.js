import express from 'express';
import { login, getCurrentUser, getSeedUsers } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/seed-users', getSeedUsers);
router.get('/me', verifyToken, getCurrentUser);

export default router;
