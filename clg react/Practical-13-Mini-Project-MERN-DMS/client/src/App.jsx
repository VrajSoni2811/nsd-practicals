import React, { useState, useEffect, useCallback } from 'react';
import StudentLabHeader from './components/StudentLabHeader.jsx';
import DmsStats from './components/DmsStats.jsx';
import DocumentCard from './components/DocumentCard.jsx';
import UploadModal from './components/UploadModal.jsx';
import AuditLogDrawer from './components/AuditLogDrawer.jsx';
import ProjectReportSection from './components/ProjectReportSection.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('repository'); // 'repository' | 'audit' | 'report'
  const [documents, setDocuments] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [classification, setClassification] = useState('All');
  const [sort, setSort] = useState('latest');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Health Pill
  const [dbState, setDbState] = useState({ isAtlas: false, mode: 'Connecting...' });

  // 1. Fetch Health
  const fetchHealth = async () => {
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      if (data.database) setDbState(data.database);
    } catch {
      setDbState({ isAtlas: false, mode: 'Offline' });
    }
  };

  // 2. Fetch Documents
  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category !== 'All') params.append('category', category);
      if (classification !== 'All') params.append('classification', classification);
      if (sort) params.append('sort', sort);

      const res = await fetch(`/api/documents?${params.toString()}`);
      const result = await res.json();
      if (result.success) {
        setDocuments(result.data);
      }
    } catch (err) {
      console.error('Fetch documents error:', err);
    } finally {
      setLoading(false);
    }
  }, [search, category, classification, sort]);

  // 3. Fetch DMS Analytics
  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/documents/analytics/overview');
      const result = await res.json();
      if (result.success) setAnalytics(result.data);
    } catch (err) {
      console.error('Analytics error:', err);
    }
  };

  // 4. Fetch Audit Logs
  const fetchAuditLogs = async () => {
    try {
      const res = await fetch('/api/documents/audit-logs');
      const result = await res.json();
      if (result.success) setAuditLogs(result.data);
    } catch (err) {
      console.error('Audit logs error:', err);
    }
  };

  useEffect(() => {
    fetchHealth();
    fetchAnalytics();
    fetchAuditLogs();
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  // 5. Delete Document
  const handleDeleteDocument = async (id, title) => {
    if (!window.confirm(`Permanently purge document "${title}" from enterprise storage?`)) return;

    try {
      const res = await fetch(`/api/documents/${id}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.success) {
        fetchDocuments();
        fetchAnalytics();
        fetchAuditLogs();
      } else {
        alert(`Deletion failure: ${result.message}`);
      }
    } catch (err) {
      alert(`Network failure: ${err.message}`);
    }
  };

  // 6. Handle Upload Success
  const handleUploadSuccess = () => {
    fetchDocuments();
    fetchAnalytics();
    fetchAuditLogs();
  };

  return (
    <div>
      {/* Header */}
      <header className="app-header">
        <div className="header-container">
          <div className="logo-group">
            <span className="badge capstone-badge">Practical 13 Capstone</span>
            <div className="title-stack">
              <h1>CloudDocs DMS: Enterprise Archival System</h1>
              <p>Full-Stack MERN Mini-Project • Ingestion, Versioning, Auditing & Access Tiers</p>
            </div>
          </div>

          <div className="header-controls">
            <div className="server-pill">
              <span className="pulse-dot"></span>
              <span>{dbState.mode || 'MongoDB Atlas'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="main-container">
        {/* 1st Semester Student Lab Record Header */}
        <StudentLabHeader />

        {/* Navigation Tabs Bar */}
        <div className="view-tabs-bar">
          <button
            className={`tab-btn ${activeTab === 'repository' ? 'active' : ''}`}
            onClick={() => setActiveTab('repository')}
          >
            📁 Document Repository
          </button>
          <button
            className={`tab-btn ${activeTab === 'audit' ? 'active' : ''}`}
            onClick={() => setActiveTab('audit')}
          >
            📋 Compliance Audit Trail ({auditLogs.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'report' ? 'active' : ''}`}
            onClick={() => setActiveTab('report')}
          >
            🎓 Mini-Project Report & Viva Voce
          </button>
        </div>

        {/* Global Storage Stats */}
        <DmsStats analytics={analytics} />

        {/* Tab 1: Document Repository */}
        {activeTab === 'repository' && (
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="filter-row">
              <div className="filter-group">
                <input
                  type="text"
                  placeholder="Search by title, code, author or tags..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-box"
                />

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="select-box"
                >
                  <option value="All">All Categories</option>
                  <option value="Technical">Technical</option>
                  <option value="Legal">Legal</option>
                  <option value="Financial">Financial</option>
                  <option value="HR">HR</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Architecture">Architecture</option>
                </select>

                <select
                  value={classification}
                  onChange={(e) => setClassification(e.target.value)}
                  className="select-box"
                >
                  <option value="All">All Classifications</option>
                  <option value="Public">Public</option>
                  <option value="Internal">Internal</option>
                  <option value="Confidential">Confidential</option>
                  <option value="Restricted">Restricted</option>
                </select>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="select-box"
                >
                  <option value="latest">Sort: Latest</option>
                  <option value="size_desc">File Size: High to Low</option>
                  <option value="downloads">Most Downloaded</option>
                </select>
              </div>

              <button onClick={() => setIsModalOpen(true)} className="btn-primary">
                + Ingest New Document
              </button>
            </div>

            {/* Documents List */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                Loading enterprise repository records...
              </div>
            ) : documents.length > 0 ? (
              <div className="docs-grid">
                {documents.map((doc) => (
                  <DocumentCard
                    key={doc._id}
                    doc={doc}
                    onDelete={handleDeleteDocument}
                  />
                ))}
              </div>
            ) : (
              <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                No documents found matching the filter criteria.
              </div>
            )}
          </section>
        )}

        {/* Tab 2: Compliance Audit Trail */}
        {activeTab === 'audit' && (
          <AuditLogDrawer logs={auditLogs} onRefresh={fetchAuditLogs} />
        )}

        {/* Tab 3: Capstone Submission Report & Viva Voce */}
        {activeTab === 'report' && (
          <ProjectReportSection />
        )}
      </main>

      {/* Ingest Document Modal */}
      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
}
