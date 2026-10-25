import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnectedToAtlas = false;
let connectionMessage = 'Connecting...';

// Pre-seeded enterprise document records
export let inMemoryDocuments = [
  {
    _id: 'dms_doc_001',
    docId: 'DOC-2026-ENG-01',
    title: 'Cloud Architecture & Disaster Recovery Plan',
    description: 'Multi-region failover blueprints, RTO/RPO SLA definitions, and cryptographic key management procedures.',
    category: 'Architecture',
    securityClassification: 'Restricted',
    version: 'v2.1',
    filename: 'sample-disaster-recovery.pdf',
    originalName: 'Cloud_DR_Blueprint_2026.pdf',
    path: 'uploads/sample-disaster-recovery.pdf',
    mimetype: 'application/pdf',
    size: 485760, // 474 KB
    formattedSize: '474.4 KB',
    author: 'Siddharth Roy',
    department: 'Engineering',
    tags: ['Cloud', 'Disaster-Recovery', 'AWS', 'High-Availability'],
    downloadCount: 14,
    isArchived: false,
    createdAt: new Date('2026-09-10'),
    updatedAt: new Date()
  },
  {
    _id: 'dms_doc_002',
    docId: 'DOC-2026-LEG-02',
    title: 'Enterprise Master Services Agreement (MSA) Standard',
    description: 'Corporate client indemnification clauses, IP ownership terms, and NDA mutual covenants.',
    category: 'Legal',
    securityClassification: 'Confidential',
    version: 'v1.4',
    filename: 'sample-msa-contract.pdf',
    originalName: 'Master_Services_Agreement_Standard.pdf',
    path: 'uploads/sample-msa-contract.pdf',
    mimetype: 'application/pdf',
    size: 295000,
    formattedSize: '288.1 KB',
    author: 'Meera Nambiar',
    department: 'Legal',
    tags: ['Legal', 'Contract', 'Compliance', 'MSA'],
    downloadCount: 28,
    isArchived: false,
    createdAt: new Date('2026-09-25'),
    updatedAt: new Date()
  },
  {
    _id: 'dms_doc_003',
    docId: 'DOC-2026-FIN-03',
    title: 'Q3 Financial Audit & Capital Allocation Report',
    description: 'Consolidated balance sheet, operational expenditure breakdowns, and quarterly runway projections.',
    category: 'Financial',
    securityClassification: 'Restricted',
    version: 'v1.0',
    filename: 'sample-financial-audit.pdf',
    originalName: 'Q3_Financial_Audit_Consolidated.pdf',
    path: 'uploads/sample-financial-audit.pdf',
    mimetype: 'application/pdf',
    size: 614400,
    formattedSize: '600.0 KB',
    author: 'Arjun Dasgupta',
    department: 'Finance',
    tags: ['Finance', 'Audit', 'Q3', 'Payroll'],
    downloadCount: 9,
    isArchived: false,
    createdAt: new Date('2026-10-05'),
    updatedAt: new Date()
  },
  {
    _id: 'dms_doc_004',
    docId: 'DOC-2026-HR-04',
    title: 'Corporate Employee Code of Conduct & Remote Policy',
    description: 'Workplace ethics, anti-harassment regulations, and intellectual property assignment guidelines.',
    category: 'HR',
    securityClassification: 'Public',
    version: 'v3.0',
    filename: 'sample-employee-handbook.pdf',
    originalName: 'Employee_Code_Of_Conduct_Handbook.pdf',
    path: 'uploads/sample-employee-handbook.pdf',
    mimetype: 'application/pdf',
    size: 198000,
    formattedSize: '193.4 KB',
    author: 'Ananya Sharma',
    department: 'Human Resources',
    tags: ['HR', 'Policy', 'Handbook', 'Onboarding'],
    downloadCount: 65,
    isArchived: false,
    createdAt: new Date('2026-08-15'),
    updatedAt: new Date()
  }
];

// Pre-seeded immutable audit log records
export let inMemoryAuditLogs = [
  {
    _id: 'log_001',
    action: 'UPLOAD',
    docId: 'DOC-2026-ENG-01',
    docTitle: 'Cloud Architecture & Disaster Recovery Plan',
    performedBy: 'Siddharth Roy',
    role: 'Lead Architect',
    ipAddress: '192.168.1.10',
    details: 'Initial version v1.0 ingested with Restricted classification.',
    createdAt: new Date('2026-09-10T09:15:00Z')
  },
  {
    _id: 'log_002',
    action: 'UPDATE',
    docId: 'DOC-2026-ENG-01',
    docTitle: 'Cloud Architecture & Disaster Recovery Plan',
    performedBy: 'Compliance Officer',
    role: 'Administrator',
    ipAddress: '192.168.1.10',
    details: 'Promoted version to v2.1 following annual SOC2 compliance audit.',
    createdAt: new Date('2026-10-01T14:30:00Z')
  },
  {
    _id: 'log_003',
    action: 'DOWNLOAD',
    docId: 'DOC-2026-FIN-03',
    docTitle: 'Q3 Financial Audit & Capital Allocation Report',
    performedBy: 'Arjun Dasgupta',
    role: 'Financial Controller',
    ipAddress: '192.168.1.45',
    details: 'Encrypted document download streamed via TLS.',
    createdAt: new Date('2026-10-12T11:20:00Z')
  }
];

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('example.mongodb.net')) {
    isConnectedToAtlas = false;
    connectionMessage = 'Operating in Standalone Simulated Mode (Atlas URI not configured or offline). Full DMS pipeline active.';
    console.log(`ℹ️ [Database] ${connectionMessage}`);
    return;
  }

  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 4000 });
    isConnectedToAtlas = true;
    connectionMessage = `Connected to MongoDB Atlas Cluster: ${conn.connection.host}`;
    console.log(`✅ [MongoDB Atlas] ${connectionMessage}`);
  } catch (error) {
    isConnectedToAtlas = false;
    connectionMessage = `Atlas Cluster Unreachable (${error.message}). Switched to High-Fidelity Local Fallback Mode.`;
    console.warn(`⚠️ [MongoDB Atlas] ${connectionMessage}`);
  }
};

export const getDBStatus = () => ({
  isAtlas: isConnectedToAtlas,
  message: connectionMessage,
  mode: isConnectedToAtlas ? 'MongoDB Atlas Cloud' : 'High-Fidelity Simulated Mongo Engine'
});
