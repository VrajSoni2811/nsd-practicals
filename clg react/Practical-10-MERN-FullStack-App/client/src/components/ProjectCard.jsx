import React from 'react';

export default function ProjectCard({ project, onStatusChange, onDelete }) {
  const {
    _id,
    title,
    description,
    category,
    status,
    priority,
    lead,
    budget,
    completionPercentage
  } = project;

  return (
    <div className="project-card glass-panel">
      <div className="project-header">
        <div>
          <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8', marginBottom: '0.4rem' }}>
            {category}
          </span>
          <h3 className="project-title">{title}</h3>
        </div>
        <span className={`priority-tag ${priority}`}>{priority}</span>
      </div>

      <p className="project-desc">{description}</p>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-header">
          <span>Sprint Progress</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{completionPercentage}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${completionPercentage}%` }}></div>
        </div>
      </div>

      {/* Meta */}
      <div className="project-meta-row">
        <span>Lead: <strong>{lead}</strong></span>
        <span>Budget: <strong style={{ color: '#fff' }}>₹{Number(budget).toLocaleString()}</strong></span>
      </div>

      {/* Footer Actions */}
      <div className="project-footer">
        <select
          value={status}
          onChange={(e) => onStatusChange(_id, e.target.value)}
          className="status-select"
        >
          <option value="Backlog">Backlog</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Review">Review</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          onClick={() => onDelete(_id, title)}
          className="btn-delete-card"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
