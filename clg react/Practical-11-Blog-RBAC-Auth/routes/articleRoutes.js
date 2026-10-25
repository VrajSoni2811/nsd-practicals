import express from 'express';
import {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  addComment
} from '../controllers/articleController.js';
import { verifyToken } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/rbac.js';

const router = express.Router();

// Public Reads
router.get('/', getArticles);
router.get('/:id', getArticleById);

// RBAC Protected Writes (Admin or Author)
router.post('/', verifyToken, authorizeRoles('Admin', 'Author'), createArticle);
router.put('/:id', verifyToken, authorizeRoles('Admin', 'Author'), updateArticle);
router.delete('/:id', verifyToken, authorizeRoles('Admin', 'Author'), deleteArticle);

// Authenticated Interactions (Reader, Author, Admin)
router.post('/:id/comments', verifyToken, addComment);

export default router;
