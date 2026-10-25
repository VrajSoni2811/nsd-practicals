import React from 'react';

export default function DmsStats({ analytics }) {
  const {
    totalDocs = 0,
    formattedTotalSize = '0.0 MB',
    totalDownloads = 0,
    categoryBreakdown = {},
    securityBreakdown = {}
  } = analytics || {};

  return (
    <section className="stats-banner glass-panel">
      <div className="stat-box">
        <span className="stat-label">Archived Documents</span>
        <span className="stat-number">{totalDocs}</span>
      </div>

      <div className="stat-divider"></div>

      <div className="stat-box">
        <span className="stat-label">Total Storage Occupied</span>
        <span className="stat-number" style={{ color: 'var(--accent-cyan)' }}>{formattedTotalSize}</span>
      </div>

      <div className="stat-divider"></div>

      <div className="stat-box">
        <span className="stat-label">Cumulative Downloads</span>
        <span className="stat-number" style={{ color: 'var(--accent-emerald)' }}>{totalDownloads}</span>
      </div>

      <div className="stat-divider"></div>

      <div className="stat-box">
        <span className="stat-label">Confidential & Restricted</span>
        <span className="stat-number" style={{ color: 'var(--accent-rose)' }}>
          {(securityBreakdown['Restricted'] || 0) + (securityBreakdown['Confidential'] || 0)}
        </span>
      </div>
    </section>
  );
}
