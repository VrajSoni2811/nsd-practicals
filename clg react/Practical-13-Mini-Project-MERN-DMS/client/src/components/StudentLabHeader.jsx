import React from 'react';

export default function StudentLabHeader() {
  return (
    <div className="student-lab-card">
      <div className="student-lab-header-row">
        <div>
          <div className="student-lab-badge">🎓 DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING</div>
          <h1 className="student-lab-title">1st Semester Web Technology &amp; Full-Stack Lab</h1>
          <p className="student-lab-sub">Academic Lab Practical Record • Session 2026-27</p>
        </div>
        <div className="student-status-badge">
          <span className="status-dot"></span>
          LAB SUBMISSION APPROVED
        </div>
      </div>

      <div className="student-meta-grid">
        <div className="meta-item">
          <span className="meta-label">STUDENT NAME</span>
          <span className="meta-val highlight">Aryan Sharma</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">ROLL NUMBER</span>
          <span className="meta-val">24CS101</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">SEMESTER / CLASS</span>
          <span className="meta-val">1st Semester (B.Tech / MCA)</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">PRACTICAL NO</span>
          <span className="meta-val highlight">Practical 13 (Mini Project)</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">BATCH</span>
          <span className="meta-val">Batch B-1</span>
        </div>
      </div>

      <div className="student-aim-box">
        <span className="aim-tag">ACADEMIC AIM:</span>
        Capstone Mini-Project: Design and develop an enterprise-grade full-stack MERN application — Secure Document Management System (DocuVault DMS) with multi-category classification, Multer disk storage, MongoDB Atlas indexing, and compliance audit logging.
      </div>
    </div>
  );
}
