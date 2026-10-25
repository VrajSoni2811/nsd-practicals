import React from 'react';
import { facultyData } from '../data/coursesData';
import { Mail, BookOpen, Award } from 'lucide-react';
import './FacultyPage.css';

export const FacultyPage = () => {
  return (
    <div className="faculty-page animate-fade-in">
      <div className="page-header">
        <span className="page-tag">Academic Directory</span>
        <h1 className="page-title">University Faculty & Course Mentors</h1>
        <p className="page-desc">
          Meet our world-class faculty leading the Web Development & MERN Stack laboratory courses.
        </p>
      </div>

      <div className="faculty-grid">
        {facultyData.map((f) => (
          <div key={f.id} className="faculty-card">
            <div className="faculty-card-header">
              <img src={f.avatar} alt={f.name} className="faculty-avatar" />
              <div className="faculty-meta">
                <h3 className="faculty-name">{f.name}</h3>
                <span className="faculty-role">{f.role}</span>
                <span className="faculty-dept">{f.department}</span>
              </div>
            </div>

            <p className="faculty-bio">{f.bio}</p>

            <div className="courses-taught-box">
              <span className="taught-label"><BookOpen size={14} /> Courses Mentored:</span>
              <div className="taught-pills">
                {f.coursesTaught.map((c) => (
                  <span key={c} className="taught-pill">{c}</span>
                ))}
              </div>
            </div>

            <div className="faculty-contact-row">
              <a href={`mailto:${f.email}`} className="contact-faculty-btn">
                <Mail size={14} /> {f.email}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
