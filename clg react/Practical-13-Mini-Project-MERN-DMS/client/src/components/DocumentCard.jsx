import React from 'react';

export default function DocumentCard({ doc, onDelete }) {
  const {
    _id,
    docId,
    title,
    description,
    category,
    securityClassification,
    version,
    formattedSize,
    author,
    department,
    downloadCount
  } = doc;

  return (
    <div className="doc-card glass-panel">
      <div className="doc-card-top">
        <span className="doc-code-pill">{docId} • {version}</span>
        <span className={`classification-badge ${securityClassification}`}>
          {securityClassification}
        </span>
      </div>

      <div>
        <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
          {category}
        </span>
        <h3 className="doc-title">{title}</h3>
      </div>

      <p className="doc-desc">{description}</p>

      <div className="doc-meta-row">
        <span>By <strong>{author}</strong> ({department})</span>
        <span>{formattedSize}</span>
      </div>

      <div className="doc-actions-row">
        <a
          href={`/api/documents/${_id}/download`}
          className="btn-download-doc"
          download
        >
          ⬇️ Download ({downloadCount})
        </a>

        <button
          onClick={() => onDelete(_id, title)}
          className="btn-delete-doc"
        >
          Purge Document
        </button>
      </div>
    </div>
  );
}
