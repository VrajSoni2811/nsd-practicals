import React from 'react';

export default function StatsOverview({ analytics }) {
  const {
    totalProjects = 0,
    completedProjects = 0,
    inProgressProjects = 0,
    totalBudget = 0,
    avgCompletion = 0
  } = analytics || {};

  return (
    <div className="stats-banner glass-panel">
      <div className="stat-box">
        <span className="stat-label">Total Projects</span>
        <span className="stat-number">{totalProjects}</span>
      </div>

      <div className="stat-divider"></div>

      <div className="stat-box">
        <span className="stat-label">Active Sprints</span>
        <span className="stat-number" style={{ color: '#38bdf8' }}>{inProgressProjects}</span>
      </div>

      <div className="stat-divider"></div>

      <div className="stat-box">
        <span className="stat-label">Completed</span>
        <span className="stat-number" style={{ color: '#34d399' }}>{completedProjects}</span>
      </div>

      <div className="stat-divider"></div>

      <div className="stat-box">
        <span className="stat-label">Overall Progress</span>
        <span className="stat-number">{avgCompletion}%</span>
      </div>

      <div className="stat-divider"></div>

      <div className="stat-box">
        <span className="stat-label">Total Committed Budget</span>
        <span className="stat-number" style={{ color: '#a78bfa' }}>
          ₹{(totalBudget / 100000).toFixed(1)} Lakhs
        </span>
      </div>
    </div>
  );
}
