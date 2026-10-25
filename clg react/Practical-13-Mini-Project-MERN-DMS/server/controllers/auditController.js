import { AuditLog } from '../models/AuditLog.js';
import { inMemoryAuditLogs, getDBStatus } from '../config/db.js';

export const getAuditLogs = async (req, res) => {
  try {
    const dbStatus = getDBStatus();

    if (dbStatus.isAtlas) {
      const logs = await AuditLog.find({}).sort({ createdAt: -1 }).limit(50);
      return res.status(200).json({ success: true, count: logs.length, data: logs });
    }

    const logs = [...inMemoryAuditLogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.status(200).json({ success: true, count: logs.length, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
