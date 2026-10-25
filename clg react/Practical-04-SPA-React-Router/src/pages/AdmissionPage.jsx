import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  CheckCircle2,
  Send,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';
import { coursesData } from '../data/coursesData';
import './AdmissionPage.css';

export const AdmissionPage = () => {
  // CRITICAL DEMONSTRATION OF useSearchParams()
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryCourseId = searchParams.get('course') || 'cs101';

  const [formData, setFormData] = useState({
    candidateName: '',
    email: '',
    phone: '',
    selectedCourse: queryCourseId,
    statement: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (queryCourseId) {
      setFormData((prev) => ({ ...prev, selectedCourse: queryCourseId }));
    }
  }, [queryCourseId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.candidateName || !formData.email) {
      alert('Please fill out name and email!');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="admission-page animate-fade-in">
      <div className="page-header">
        <span className="page-tag">Admissions Portal</span>
        <h1 className="page-title">Curriculum Admission Application</h1>
        <p className="page-desc">
          Demonstrates Query String processing via <code>useSearchParams()</code>. Course selected from URL: <code>?course={queryCourseId}</code>.
        </p>
      </div>

      {submitted ? (
        <div className="submitted-card animate-fade-in">
          <div className="success-icon-box">
            <CheckCircle2 size={48} />
          </div>
          <h2>Application Dispatched Successfully!</h2>
          <p>
            Thank you, <strong>{formData.candidateName}</strong>. Your admission request for <strong>{formData.selectedCourse.toUpperCase()}</strong> has been recorded.
          </p>
          <button className="return-home-btn" onClick={() => navigate('/')}>
            Return to Dashboard
          </button>
        </div>
      ) : (
        <div className="admission-form-wrapper">
          <form onSubmit={handleSubmit} className="admission-form">
            <div className="form-group">
              <label>Applicant Full Name:</label>
              <input
                type="text"
                required
                placeholder="e.g. John Doe"
                className="spa-input"
                value={formData.candidateName}
                onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Official Email:</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="spa-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Contact Number:</label>
                <input
                  type="tel"
                  placeholder="9876543210"
                  className="spa-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Applied Curriculum Module (Controlled via useSearchParams):</label>
              <select
                className="spa-input"
                value={formData.selectedCourse}
                onChange={(e) => setFormData({ ...formData, selectedCourse: e.target.value })}
              >
                {coursesData.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code}: {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Statement of Purpose & Career Goal:</label>
              <textarea
                rows={4}
                placeholder="Explain why you wish to enroll in this MERN curriculum module..."
                className="spa-input"
                value={formData.statement}
                onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
              />
            </div>

            <button type="submit" className="submit-admission-btn">
              <Send size={16} /> Submit Admission Application
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
