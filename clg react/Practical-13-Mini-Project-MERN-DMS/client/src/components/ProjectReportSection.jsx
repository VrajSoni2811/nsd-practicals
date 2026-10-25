import React from 'react';

export default function ProjectReportSection() {
  const vivaItems = [
    {
      q: 'Q1: What is the core problem solved by CloudDocs DMS in enterprise environments?',
      a: 'Unregulated file sharing across corporate drives leads to silent file overwrites, unmonitored leaks of confidential trade secrets, and non-compliance with statutory regulations (such as SOC2, ISO 27001, and GDPR). CloudDocs DMS provides centralized document ingestion with cryptographic unique file naming, strict security classification levels (Public, Internal, Confidential, Restricted), semantic tagging, and an immutable audit trail capturing every download and update.'
    },
    {
      q: 'Q2: How does CloudDocs DMS combine Multer and MongoDB without violating database size limits?',
      a: 'MongoDB enforces a hard 16MB document size limit under the BSON specification. Attempting to store raw binary blobs inside database documents causes severe RAM cache thrashing. CloudDocs DMS utilizes Multer diskStorage to stream the raw binary stream directly to server disk storage (or S3 buckets), and persists only lightweight, typed, and indexed metadata in MongoDB, enabling sub-millisecond search and retrieval.'
    },
    {
      q: 'Q3: Explain the purpose and immutability of the Audit Logging subsystem.',
      a: 'In regulated financial and medical domains, compliance requires non-repudiation: proof of who accessed or modified sensitive records. The AuditLog collection records the action (UPLOAD, DOWNLOAD, UPDATE, DELETE), user identity, role, timestamp, and IP address. Crucially, the API does not expose any DELETE or PUT endpoints for the audit log, ensuring records remain tamper-proof.'
    },
    {
      q: 'Q4: How does the application prevent Path Traversal and File Overwrite vulnerabilities?',
      a: 'Multer diskStorage strips path separators (like ../) using path.basename and generates unique filenames composed of timestamps and cryptographically secure random bytes (crypto.randomBytes(6).toString("hex")). This guarantees that files cannot overwrite preexisting records, and malicious clients cannot save files outside the designated uploads directory.'
    },
    {
      q: 'Q5: How does the frontend handle file downloads securely?',
      a: 'The frontend does not expose static public URLs directly. Instead, clicking "Download" invokes the backend endpoint /api/documents/:id/download. The Express controller verifies document presence, increments the downloadCounter, writes a DOWNLOAD entry into the audit trail, and invokes res.download(path, originalName) setting Content-Disposition: attachment.'
    },
    {
      q: 'Q6: What MongoDB Aggregation Pipeline operations are performed for DMS Analytics?',
      a: 'The analytics endpoint aggregates documents across multiple dimensions: calculating the sum of storage consumed ($sum: "$size"), counting total documents per business category ($group by "$category"), and categorizing documents by security classification ($group by "$securityClassification") to generate live dashboard statistics.'
    },
    {
      q: 'Q7: How is state synchronization managed between React 19 and the Express backend?',
      a: 'React functional components leverage useEffect and useCallback hooks to synchronize state. When a document is ingested or deleted, the client re-fetches the filtered document collection and refreshes the analytics and audit log drawers, ensuring real-time consistency without full page reloads.'
    },
    {
      q: 'Q8: What future architectural enhancements would make this platform ready for millions of concurrent users?',
      a: '1. Object Storage: Offload physical disk storage to AWS S3 or Cloudflare R2 with pre-signed upload/download URLs.\n2. Full-Text Search: Implement MongoDB Atlas Search or Elasticsearch for indexing text inside uploaded PDFs.\n3. Zero-Trust Encryption: Encrypt files at rest using AES-256 with envelope encryption via AWS KMS.\n4. Microservices: Decouple the file ingestion worker from the metadata querying API using Apache Kafka.'
    }
  ];

  return (
    <section className="report-card glass-panel">
      <div className="report-header">
        <span className="badge capstone-badge">Final Capstone Mini-Project Submission</span>
        <h2>Enterprise CloudDocs DMS: Project Report & Lab Defense</h2>
        <p className="report-sub">
          Design, Development, and Deployment Documentation for MERN Stack Full-Application Evaluation
        </p>
      </div>

      <div className="report-section">
        <h3>1. Executive Abstract</h3>
        <p>
          CloudDocs DMS is an industry-grade, enterprise-ready Document Management and Compliance Archival platform designed and developed using the <strong>MERN Full-Stack</strong> (MongoDB Atlas, Express.js, React 19, and Node.js). The system provides multi-tier security classifications, version tracking, file ingestion with strict MIME validation, aggregated storage metrics, and an immutable audit logging engine satisfying enterprise compliance standards.
        </p>
      </div>

      <div className="report-section">
        <h3>2. System Architectural Layers</h3>
        <p>
          The architecture follows a decoupled, three-tier enterprise design:
        </p>
        <ul style={{ marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <li><strong>Client Tier:</strong> Modern React 19 Single Page Application (SPA) with declarative components, custom glassmorphism design system, responsive filtering, and modal workflows.</li>
          <li><strong>Application Tier:</strong> Modular Express.js 4 REST API with request logging, Multer multipart streaming engine, cryptographic filename generation, and centralized error handling.</li>
          <li><strong>Data Tier:</strong> Dual-mode MongoDB persistence (MongoDB Atlas Cloud Cluster with automatic failover to a high-fidelity local engine) modeled via Mongoose schemas.</li>
        </ul>
      </div>

      <div className="report-section">
        <h3>3. Database Entity Specifications</h3>
        <p>
          The platform persists two interconnected MongoDB collections:
        </p>
        <ul style={{ marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <li><strong>Document Collection:</strong> Stores document metadata (docId, title, category, securityClassification, version, path, size, author, department, downloadCount, timestamps).</li>
          <li><strong>AuditLog Collection:</strong> Stores immutable historical audit trail records (action, docId, docTitle, performedBy, role, ipAddress, details, createdAt).</li>
        </ul>
      </div>

      <div className="report-section">
        <h3>4. Viva Voce Defense Questions & Comprehensive Answers</h3>
        <div className="accordion-list">
          {vivaItems.map((item, idx) => (
            <details key={idx} className="accordion-item" open={idx === 0}>
              <summary>{item.q}</summary>
              <div className="accordion-content">
                <p style={{ whiteSpace: 'pre-line' }}>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
