import fs from 'fs';
import path from 'path';
import { Document } from '../models/Document.js';
import { AuditLog } from '../models/AuditLog.js';
import { inMemoryDocuments, inMemoryAuditLogs, getDBStatus } from '../config/db.js';
import { UPLOADS_DIR } from '../config/multerConfig.js';

// Helper: Format bytes to human readable
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// Helper: Log audit trail
async function recordAudit(action, docId, docTitle, details, user = 'Admin Compliance Officer') {
  const logItem = {
    action,
    docId,
    docTitle,
    performedBy: user,
    role: 'Administrator',
    ipAddress: '127.0.0.1',
    details,
    createdAt: new Date()
  };

  const dbStatus = getDBStatus();
  if (dbStatus.isAtlas) {
    try {
      await AuditLog.create(logItem);
    } catch (err) {
      console.warn('Audit log write failure:', err.message);
    }
  } else {
    inMemoryAuditLogs.unshift({
      _id: `log_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      ...logItem
    });
  }
}

/**
 * 1. GET /api/documents
 * Multi-field search, category & classification filtering
 */
export const getDocuments = async (req, res) => {
  try {
    const { category, classification, search, sort } = req.query;
    const dbStatus = getDBStatus();

    if (dbStatus.isAtlas) {
      let query = {};
      if (category && category !== 'All') query.category = category;
      if (classification && classification !== 'All') query.securityClassification = classification;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { docId: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } },
          { department: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }

      let sortOptions = { createdAt: -1 };
      if (sort === 'size_desc') sortOptions = { size: -1 };
      else if (sort === 'downloads') sortOptions = { downloadCount: -1 };

      const docs = await Document.find(query).sort(sortOptions);
      return res.status(200).json({ success: true, count: docs.length, data: docs });
    }

    // In-memory fallback
    let result = [...inMemoryDocuments];
    if (category && category !== 'All') {
      result = result.filter((d) => d.category.toLowerCase() === category.toLowerCase());
    }
    if (classification && classification !== 'All') {
      result = result.filter((d) => d.securityClassification.toLowerCase() === classification.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.docId.toLowerCase().includes(q) ||
          d.author.toLowerCase().includes(q) ||
          d.department.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q)
      );
    }

    if (sort === 'size_desc') result.sort((a, b) => b.size - a.size);
    else if (sort === 'downloads') result.sort((a, b) => b.downloadCount - a.downloadCount);
    else result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({ success: true, count: result.length, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 2. POST /api/documents/upload
 * Multipart file upload + metadata persistence + audit logging
 */
export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No document file provided.' });
    }

    const { title, description, category, securityClassification, author, department, version } = req.body;
    const dbStatus = getDBStatus();

    const docId = `DOC-2026-${category.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const docData = {
      docId,
      title: title ? title.trim() : req.file.originalname,
      description: description ? description.trim() : 'Uploaded to CloudDocs DMS repository.',
      category: category || 'Technical',
      securityClassification: securityClassification || 'Internal',
      version: version || 'v1.0',
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: `uploads/${req.file.filename}`,
      mimetype: req.file.mimetype,
      size: req.file.size,
      author: author ? author.trim() : 'Compliance Officer',
      department: department || 'Engineering',
      tags: [category, securityClassification],
      downloadCount: 0,
      isArchived: false
    };

    if (dbStatus.isAtlas) {
      const saved = await Document.create(docData);
      await recordAudit('UPLOAD', docId, docData.title, `Uploaded version ${docData.version} (${docData.securityClassification})`, docData.author);
      return res.status(201).json({ success: true, message: 'Document ingested successfully into Atlas.', data: saved });
    }

    const mockDoc = {
      _id: `dms_${Date.now()}`,
      ...docData,
      formattedSize: formatBytes(req.file.size),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    inMemoryDocuments.unshift(mockDoc);
    await recordAudit('UPLOAD', docId, docData.title, `Uploaded version ${docData.version} (${docData.securityClassification})`, docData.author);

    res.status(201).json({ success: true, message: 'Document ingested successfully.', data: mockDoc });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 3. GET /api/documents/:id/download
 * Secure document download + audit log
 */
export const downloadDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();
    let doc;

    if (dbStatus.isAtlas) {
      doc = await Document.findById(id);
      if (doc) {
        doc.downloadCount += 1;
        await doc.save();
      }
    } else {
      doc = inMemoryDocuments.find((d) => d._id === id || d.docId === id);
      if (doc) doc.downloadCount += 1;
    }

    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found.' });
    }

    const filePath = path.join(UPLOADS_DIR, doc.filename);

    if (!fs.existsSync(filePath)) {
      // Fallback: create placeholder file so download doesn't crash on demo mocks
      fs.writeFileSync(filePath, `CloudDocs DMS Archive: ${doc.title} (${doc.docId})\nClassification: ${doc.securityClassification}\nAuthor: ${doc.author}\n`);
    }

    await recordAudit('DOWNLOAD', doc.docId, doc.title, `Document attachment downloaded (Streamed as ${doc.originalName})`);
    res.download(filePath, doc.originalName);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 4. PUT /api/documents/:id
 * Update metadata & version + audit log
 */
export const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();

    if (dbStatus.isAtlas) {
      const updated = await Document.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Document not found.' });
      await recordAudit('UPDATE', updated.docId, updated.title, `Metadata updated: Version=${updated.version}, Classification=${updated.securityClassification}`);
      return res.status(200).json({ success: true, message: 'Document updated in Atlas.', data: updated });
    }

    const index = inMemoryDocuments.findIndex((d) => d._id === id || d.docId === id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Document not found.' });

    inMemoryDocuments[index] = {
      ...inMemoryDocuments[index],
      ...req.body,
      updatedAt: new Date()
    };

    const doc = inMemoryDocuments[index];
    await recordAudit('UPDATE', doc.docId, doc.title, `Metadata updated: Version=${doc.version}, Classification=${doc.securityClassification}`);

    res.status(200).json({ success: true, message: 'Document updated successfully.', data: doc });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * 5. DELETE /api/documents/:id
 * Delete document from disk and database + audit log
 */
export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();
    let doc;

    if (dbStatus.isAtlas) {
      doc = await Document.findByIdAndDelete(id);
      if (!doc) return res.status(404).json({ success: false, message: 'Document not found.' });
    } else {
      const index = inMemoryDocuments.findIndex((d) => d._id === id || d.docId === id);
      if (index === -1) return res.status(404).json({ success: false, message: 'Document not found.' });
      doc = inMemoryDocuments.splice(index, 1)[0];
    }

    // Attempt physical deletion
    const filePath = path.join(UPLOADS_DIR, doc.filename);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.warn(`Could not delete file ${filePath}: ${err.message}`);
      }
    }

    await recordAudit('DELETE', doc.docId, doc.title, `Document permanently purged from disk and database repository.`);

    res.status(200).json({ success: true, message: `Document '${doc.title}' deleted successfully.` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 6. GET /api/documents/analytics/overview
 * MongoDB Aggregation Pipeline simulation: category breakdown, security counts, storage totals
 */
export const getDmsAnalytics = async (req, res) => {
  try {
    const dbStatus = getDBStatus();
    let docs = [];

    if (dbStatus.isAtlas) {
      docs = await Document.find({});
    } else {
      docs = inMemoryDocuments;
    }

    const totalDocs = docs.length;
    const totalBytes = docs.reduce((acc, d) => acc + (d.size || 0), 0);
    const totalDownloads = docs.reduce((acc, d) => acc + (d.downloadCount || 0), 0);

    const categoryMap = {};
    const securityMap = {};

    docs.forEach((d) => {
      categoryMap[d.category] = (categoryMap[d.category] || 0) + 1;
      securityMap[d.securityClassification] = (securityMap[d.securityClassification] || 0) + 1;
    });

    res.status(200).json({
      success: true,
      data: {
        totalDocs,
        totalBytes,
        formattedTotalSize: formatBytes(totalBytes),
        totalDownloads,
        categoryBreakdown: categoryMap,
        securityBreakdown: securityMap
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
