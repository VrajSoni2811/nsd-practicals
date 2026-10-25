import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: ['UPLOAD', 'DOWNLOAD', 'UPDATE', 'DELETE', 'VIEW_METADATA', 'SECURITY_OVERRIDE']
    },
    docId: {
      type: String,
      required: true
    },
    docTitle: {
      type: String,
      required: true
    },
    performedBy: {
      type: String,
      default: 'Admin Compliance Officer'
    },
    role: {
      type: String,
      default: 'Administrator'
    },
    ipAddress: {
      type: String,
      default: '127.0.0.1'
    },
    details: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
