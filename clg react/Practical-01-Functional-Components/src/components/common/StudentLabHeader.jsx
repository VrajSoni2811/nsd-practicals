import React from 'react';

export function StudentLabHeader({ practicalNo = '01', aim }) {
  return (
    <div className="student-lab-card">
      <div className="college-meta-header">
        <div className="college-brand">
          <span className="college-logo">🎓</span>
          <div>
            <h2 className="college-title">DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING</h2>
            <p className="college-subtitle">1st Semester Web Technology & React Lab Practical Record • Session 2026-27</p>
          </div>
        </div>
        <div className="lab-verified-stamp">
          <span className="stamp-dot"></span>
          <span>LAB SUBMISSION APPROVED</span>
        </div>
      </div>

      <div className="student-meta-grid">
        <div className="meta-cell">
          <span className="meta-label">STUDENT NAME</span>
          <span className="meta-value">Aryan Sharma</span>
        </div>
        <div className="meta-cell">
          <span className="meta-label">ROLL NO</span>
          <span className="meta-value highlight-cyan">24CS101</span>
        </div>
        <div className="meta-cell">
          <span className="meta-label">SEMESTER</span>
          <span className="meta-value">1st Semester (B.Tech / MCA)</span>
        </div>
        <div className="meta-cell">
          <span className="meta-label">PRACTICAL NO</span>
          <span className="meta-value highlight-accent">Practical {practicalNo}</span>
        </div>
        <div className="meta-cell">
          <span className="meta-label">LAB BATCH</span>
          <span className="meta-value">Batch B-1</span>
        </div>
      </div>

      <div className="aim-box">
        <span className="aim-badge">LAB AIM</span>
        <p className="aim-content">{aim}</p>
      </div>
    </div>
  );
}

export default StudentLabHeader;
