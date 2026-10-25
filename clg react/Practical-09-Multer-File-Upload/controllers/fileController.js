import fs from 'fs';
import path from 'path';
import { FileRecord } from '../models/FileRecord.js';
import { inMemoryFiles, getDBStatus } from '../config/db.js';
import { UPLOADS_DIR } from '../config/multerConfig.js';

// Helper: Format bytes to human readable
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * 1. POST /api/files/upload
 * Single file upload with category and description
 */
export const uploadSingle = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file provided in form-data payload.' });
    }

    const { category, description, uploader } = req.body;
    const dbStatus = getDBStatus();

    const fileData = {
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: `uploads/${req.file.filename}`,
      mimetype: req.file.mimetype,
      size: req.file.size,
      category: category || 'Document',
      description: description || 'Uploaded via Multer API',
      uploader: uploader || 'Student'
    };

    if (dbStatus.isAtlas) {
      const savedDoc = await FileRecord.create(fileData);
      return res.status(201).json({
        success: true,
        message: 'File uploaded and metadata stored in MongoDB Atlas.',
        data: savedDoc
      });
    }

    // In-memory fallback
    const mockDoc = {
      _id: `671cb${Date.now().toString().slice(-19)}`,
      ...fileData,
      formattedSize: formatBytes(req.file.size),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    inMemoryFiles.unshift(mockDoc);

    res.status(201).json({
      success: true,
      message: 'File saved to disk and metadata registered.',
      data: mockDoc
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 2. POST /api/files/upload-multiple
 * Batch upload up to 5 files
 */
export const uploadMultiple = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files provided.' });
    }

    const { category, uploader } = req.body;
    const dbStatus = getDBStatus();
    const records = [];

    for (const file of req.files) {
      const fileData = {
        originalName: file.originalname,
        filename: file.filename,
        path: `uploads/${file.filename}`,
        mimetype: file.mimetype,
        size: file.size,
        category: category || 'Document',
        description: `Batch upload item (${file.originalname})`,
        uploader: uploader || 'Student'
      };

      if (dbStatus.isAtlas) {
        const saved = await FileRecord.create(fileData);
        records.push(saved);
      } else {
        const mock = {
          _id: `671cb${Date.now().toString().slice(-19)}${Math.floor(Math.random() * 1000)}`,
          ...fileData,
          formattedSize: formatBytes(file.size),
          createdAt: new Date(),
          updatedAt: new Date()
        };
        inMemoryFiles.unshift(mock);
        records.push(mock);
      }
    }

    res.status(201).json({
      success: true,
      message: `Successfully uploaded ${records.length} files.`,
      count: records.length,
      data: records
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 3. GET /api/files
 * List all file records with search and category filter
 */
export const getAllFiles = async (req, res) => {
  try {
    const { category, search } = req.query;
    const dbStatus = getDBStatus();

    if (dbStatus.isAtlas) {
      let query = {};
      if (category && category !== 'All') query.category = category;
      if (search) {
        query.$or = [
          { originalName: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      const files = await FileRecord.find(query).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: files.length, data: files });
    }

    let result = [...inMemoryFiles];
    if (category && category !== 'All') {
      result = result.filter((f) => f.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (f) => f.originalName.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({ success: true, count: result.length, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 4. GET /api/files/:id/download
 * Download file attachment
 */
export const downloadFile = async (req, res) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();
    let fileDoc;

    if (dbStatus.isAtlas) {
      fileDoc = await FileRecord.findById(id);
    } else {
      fileDoc = inMemoryFiles.find((f) => f._id === id || f.filename === id);
    }

    if (!fileDoc) {
      return res.status(404).json({ success: false, message: 'File record not found in database.' });
    }

    const filePath = path.join(UPLOADS_DIR, fileDoc.filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: `Physical file '${fileDoc.filename}' is missing from uploads directory.`
      });
    }

    res.download(filePath, fileDoc.originalName);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 5. DELETE /api/files/:id
 * Remove metadata from MongoDB and delete file from disk
 */
export const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();
    let fileDoc;

    if (dbStatus.isAtlas) {
      fileDoc = await FileRecord.findById(id);
      if (!fileDoc) {
        return res.status(404).json({ success: false, message: 'File record not found.' });
      }
      await FileRecord.findByIdAndDelete(id);
    } else {
      const index = inMemoryFiles.findIndex((f) => f._id === id || f.filename === id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'File record not found.' });
      }
      fileDoc = inMemoryFiles.splice(index, 1)[0];
    }

    // Attempt physical deletion from disk
    const filePath = path.join(UPLOADS_DIR, fileDoc.filename);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.warn(`Could not delete file ${filePath}: ${err.message}`);
      }
    }

    res.status(200).json({
      success: true,
      message: `File '${fileDoc.originalName}' deleted from database and disk.`,
      data: fileDoc
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 6. GET /api/files/stats/storage
 * Aggregated storage stats
 */
export const getStorageStats = async (req, res) => {
  try {
    const dbStatus = getDBStatus();
    let files = [];

    if (dbStatus.isAtlas) {
      files = await FileRecord.find({});
    } else {
      files = inMemoryFiles;
    }

    const totalFiles = files.length;
    const totalBytes = files.reduce((acc, f) => acc + (f.size || 0), 0);

    const categoryMap = {};
    files.forEach((f) => {
      categoryMap[f.category] = (categoryMap[f.category] || 0) + 1;
    });

    res.status(200).json({
      success: true,
      data: {
        totalFiles,
        totalBytes,
        formattedTotalSize: formatBytes(totalBytes),
        categoryBreakdown: categoryMap
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
