import React, { useState, useEffect, useCallback } from 'react';
import StudentLabHeader from './components/StudentLabHeader.jsx';
import StatsOverview from './components/StatsOverview.jsx';
import ProjectCard from './components/ProjectCard.jsx';
import ProjectFormModal from './components/ProjectFormModal.jsx';
import VivaSection from './components/VivaSection.jsx';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Search
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [sort, setSort] = useState('latest');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Health Pill
  const [dbState, setDbState] = useState({ isAtlas: false, mode: 'Connecting...' });

  // 1. Fetch Backend Health & DB Status
  const fetchHealth = async () => {
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      if (data.database) {
        setDbState(data.database);
      }
    } catch {
      setDbState({ isAtlas: false, mode: 'Offline' });
    }
  };

  // 2. Fetch Projects
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category !== 'All') params.append('category', category);
      if (status !== 'All') params.append('status', status);
      if (sort) params.append('sort', sort);

      const res = await fetch(`/api/projects?${params.toString()}`);
      const result = await res.json();

      if (result.success) {
        setProjects(result.data);
        setError(null);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [search, category, status, sort]);

  // 3. Fetch Summary Analytics
  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/projects/analytics/summary');
      const result = await res.json();
      if (result.success) {
        setAnalytics(result.data);
      }
    } catch (err) {
      console.error('Analytics error:', err);
    }
  };

  useEffect(() => {
    fetchHealth();
    fetchAnalytics();
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // 4. Update Status Handler (Optimistic UI)
  const handleStatusChange = async (id, newStatus) => {
    // Snapshot previous
    const previous = [...projects];

    // Optimistic Update
    setProjects(prev => prev.map(p => p._id === id ? { ...p, status: newStatus } : p));

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const result = await res.json();
      if (!result.success) {
        // Rollback
        setProjects(previous);
        alert(`Failed to update status: ${result.message}`);
      } else {
        fetchAnalytics();
      }
    } catch (err) {
      setProjects(previous);
      alert(`Network error: ${err.message}`);
    }
  };

  // 5. Delete Project Handler
  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete project "${title}" permanently from MongoDB?`)) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.success) {
        fetchProjects();
        fetchAnalytics();
      } else {
        alert(`Delete failed: ${result.message}`);
      }
    } catch (err) {
      alert(`Delete error: ${err.message}`);
    }
  };

  // 6. Create Project Handler
  const handleCreateProject = async (formData) => {
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      if (result.success) {
        setIsModalOpen(false);
        fetchProjects();
        fetchAnalytics();
      } else {
        alert(`Creation error: ${result.message}`);
      }
    } catch (err) {
      alert(`Network error: ${err.message}`);
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="app-header">
        <div className="header-container">
          <div className="logo-group">
            <span className="badge mern-badge">Practical 10</span>
            <div className="title-stack">
              <h1>Full-Stack MERN Project Management</h1>
              <p>React 19 SPA • Express 4 Backend • MongoDB Atlas Cloud ODM</p>
            </div>
          </div>

          <div className="header-controls">
            <div className="server-pill">
              <span className="pulse-dot"></span>
              <span>{dbState.mode || 'MongoDB Atlas'}</span>
            </div>
            <a href="#viva-section" className="btn-secondary btn-sm">Viva Voce Q&A</a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-container">
        {/* 1st Semester Student Lab Record Header */}
        <StudentLabHeader />

        {/* Statistics Banner */}
        <StatsOverview analytics={analytics} />

        {/* Filter and Action Toolbar */}
        <div className="filter-bar">
          <div className="filter-group">
            <input
              type="text"
              placeholder="Search projects, leads or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select-control"
            >
              <option value="All">All Domains</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="FullStack">FullStack</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Mobile">Mobile</option>
              <option value="DevOps">DevOps</option>
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="select-control"
            >
              <option value="All">All Statuses</option>
              <option value="Backlog">Backlog</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Review">Review</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="select-control"
            >
              <option value="latest">Sort: Latest</option>
              <option value="budget_desc">Budget: High to Low</option>
              <option value="budget_asc">Budget: Low to High</option>
              <option value="completion">Completion %</option>
            </select>
          </div>

          <button onClick={() => setIsModalOpen(true)} className="btn-primary">
            + Create Sprint Project
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="glass-panel" style={{ padding: '1rem', borderLeft: '4px solid #f43f5e', color: '#f87171' }}>
            <strong>Error connecting to MERN Backend:</strong> {error}
          </div>
        )}

        {/* Projects Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            Loading live projects from MongoDB backend...
          </div>
        ) : projects.length > 0 ? (
          <div className="projects-grid">
            {projects.map((proj) => (
              <ProjectCard
                key={proj._id}
                project={proj}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            No projects found matching the selected filters. Click "+ Create Sprint Project" to add one!
          </div>
        )}

        {/* Viva Voce Section */}
        <VivaSection />
      </main>

      {/* Project Creation Modal */}
      <ProjectFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateProject}
      />
    </div>
  );
}
