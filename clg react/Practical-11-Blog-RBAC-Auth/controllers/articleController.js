import { Article } from '../models/Article.js';
import { inMemoryArticles, getDBStatus } from '../config/db.js';

/**
 * 1. GET /api/articles
 * Public: List all articles with search & category filtering
 */
export const getArticles = async (req, res) => {
  try {
    const { category, search } = req.query;
    const dbStatus = getDBStatus();

    if (dbStatus.isAtlas) {
      let query = {};
      if (category && category !== 'All') query.category = category;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { excerpt: { $regex: search, $options: 'i' } },
          { authorName: { $regex: search, $options: 'i' } }
        ];
      }
      const articles = await Article.find(query).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: articles.length, data: articles });
    }

    // In-memory fallback
    let result = [...inMemoryArticles];
    if (category && category !== 'All') {
      result = result.filter((a) => a.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.authorName.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({ success: true, count: result.length, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 2. GET /api/articles/:id
 * Public: Retrieve single article
 */
export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();

    if (dbStatus.isAtlas) {
      const article = await Article.findById(id);
      if (!article) return res.status(404).json({ success: false, message: 'Article not found.' });
      return res.status(200).json({ success: true, data: article });
    }

    const article = inMemoryArticles.find((a) => a._id === id);
    if (!article) return res.status(404).json({ success: false, message: 'Article not found.' });

    res.status(200).json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 3. POST /api/articles
 * RBAC Protected: Requires Author or Admin
 */
export const createArticle = async (req, res) => {
  try {
    const { title, excerpt, content, category, readTimeMinutes } = req.body;
    const dbStatus = getDBStatus();

    if (!title || !content || !excerpt) {
      return res.status(400).json({
        success: false,
        message: 'Validation Failure: title, excerpt and content are required.'
      });
    }

    const articleData = {
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      category: category || 'Architecture',
      authorId: req.user.id,
      authorName: req.user.name,
      authorRole: req.user.role,
      status: 'Published',
      readTimeMinutes: Number(readTimeMinutes) || 4,
      likes: 0,
      comments: []
    };

    if (dbStatus.isAtlas) {
      const created = await Article.create(articleData);
      return res.status(201).json({ success: true, message: 'Article published in Atlas.', data: created });
    }

    const mockArticle = {
      _id: `art_${Date.now().toString().slice(-6)}`,
      ...articleData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    inMemoryArticles.unshift(mockArticle);

    res.status(201).json({ success: true, message: 'Article published successfully.', data: mockArticle });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * 4. PUT /api/articles/:id
 * RBAC & Ownership Protected: Requires Admin OR matching Author
 */
export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();
    let existing;

    if (dbStatus.isAtlas) {
      existing = await Article.findById(id);
    } else {
      existing = inMemoryArticles.find((a) => a._id === id);
    }

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }

    // Ownership Enforcement: Non-admins can only modify their own articles
    if (req.user.role !== 'Admin' && existing.authorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: `RBAC Violation: Authors can only edit their own articles. Article owned by '${existing.authorName}'.`
      });
    }

    if (dbStatus.isAtlas) {
      const updated = await Article.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      return res.status(200).json({ success: true, message: 'Article updated.', data: updated });
    }

    const idx = inMemoryArticles.findIndex((a) => a._id === id);
    inMemoryArticles[idx] = {
      ...inMemoryArticles[idx],
      ...req.body,
      updatedAt: new Date()
    };

    res.status(200).json({ success: true, message: 'Article updated successfully.', data: inMemoryArticles[idx] });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * 5. DELETE /api/articles/:id
 * RBAC & Ownership Protected: Requires Admin OR matching Author
 */
export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();
    let existing;

    if (dbStatus.isAtlas) {
      existing = await Article.findById(id);
    } else {
      existing = inMemoryArticles.find((a) => a._id === id);
    }

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }

    // Ownership Enforcement
    if (req.user.role !== 'Admin' && existing.authorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: `RBAC Violation: Authors can only delete their own articles. Article owned by '${existing.authorName}'.`
      });
    }

    if (dbStatus.isAtlas) {
      await Article.findByIdAndDelete(id);
      return res.status(200).json({ success: true, message: `Article '${existing.title}' deleted.` });
    }

    const idx = inMemoryArticles.findIndex((a) => a._id === id);
    inMemoryArticles.splice(idx, 1);

    res.status(200).json({ success: true, message: `Article '${existing.title}' deleted.` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 6. POST /api/articles/:id/comments
 * Authenticated Action (Reader, Author, Admin)
 */
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { commentText } = req.body;

    if (!commentText || !commentText.trim()) {
      return res.status(400).json({ success: false, message: 'Comment text cannot be empty.' });
    }

    const newComment = {
      userName: req.user.name,
      userRole: req.user.role,
      commentText: commentText.trim(),
      createdAt: new Date()
    };

    const dbStatus = getDBStatus();
    if (dbStatus.isAtlas) {
      const article = await Article.findById(id);
      if (!article) return res.status(404).json({ success: false, message: 'Article not found.' });
      article.comments.push(newComment);
      await article.save();
      return res.status(201).json({ success: true, message: 'Comment added.', data: article.comments });
    }

    const article = inMemoryArticles.find((a) => a._id === id);
    if (!article) return res.status(404).json({ success: false, message: 'Article not found.' });

    article.comments.push(newComment);
    res.status(201).json({ success: true, message: 'Comment added.', data: article.comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
