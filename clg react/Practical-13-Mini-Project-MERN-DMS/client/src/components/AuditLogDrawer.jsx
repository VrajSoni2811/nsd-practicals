import React from 'react';

export default function AuditLogDrawer({ logs, onRefresh }) {
  return (
    <section className="glass-panel audit-table-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Immutable Compliance Audit Trail</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Real-time tracking of all document ingestion, download streams, version updates, and security purges.
          </p>
        </div>
        <button onClick={onRefresh} className="btn-secondary btn-sm">Refresh Trail</button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="audit-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Action</th>
              <th>Document Code</th>
              <th>Document Title</th>
              <th>Performed By</th>
              <th>Audit Narrative</th>
            </tr>
          </thead>
          <tbody>
            {logs && logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log._id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td>
                    <span className={`action-pill ${log.action}`}>{log.action}</span>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
                    {log.docId}
                  </td>
                  <td style={{ fontWeight: '600' }}>{log.docTitle}</td>
                  <td>
                    <span>{log.performedBy}</span>
                    <br /><small style={{ color: 'var(--text-muted)' }}>{log.role}</small>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>{log.details}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                  No audit trail records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
