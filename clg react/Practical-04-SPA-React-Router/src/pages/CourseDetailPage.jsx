import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Award,
  Users,
  CheckCircle2,
  Calendar,
  Layers,
  GraduationCap,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { coursesData } from '../data/coursesData';
import './CourseDetailPage.css';

export const CourseDetailPage = () => {
  // CRITICAL DEMONSTRATION OF useParams() HOOK
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Find course matching URL parameter
  const course = coursesData.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="course-not-found animate-fade-in">
        <h2>Course Not Found</h2>
        <p>No curriculum module exists with ID <code>{courseId}</code>.</p>
        <button className="back-link-btn" onClick={() => navigate('/courses')}>
          <ArrowLeft size={16} /> Back to Course Catalog
        </button>
      </div>
    );
  }

  // Programmatic navigation demonstration
  const handleEnrollClick = () => {
    navigate(`/admission?course=${course.id}`);
  };

  return (
    <div className="course-detail-page animate-fade-in">
      {/* Top Navigation Row */}
      <div className="detail-nav-row">
        <button className="back-link-btn" onClick={() => navigate('/courses')}>
          <ArrowLeft size={16} /> Back to Curriculum
        </button>
        <span className="route-param-badge">
          useParams() &rarr; courseId: <strong>"{courseId}"</strong>
        </span>
      </div>

      {/* Course Hero Card */}
      <div className="detail-hero-card">
        <div className="detail-hero-main">
          <div className="detail-tags-row">
            <span className="code-tag">{course.code}</span>
            <span className="category-tag">{course.category}</span>
            <span className="credits-tag">{course.credits} Credits</span>
          </div>

          <h1 className="detail-title">{course.title}</h1>
          <p className="detail-description">{course.description}</p>

          <div className="detail-meta-strip">
            <div className="meta-col">
              <span className="meta-col-label">Duration</span>
              <span className="meta-col-val"><Clock size={15} /> {course.duration}</span>
            </div>
            <div className="meta-col">
              <span className="meta-col-label">Level</span>
              <span className="meta-col-val"><Award size={15} /> {course.level}</span>
            </div>
            <div className="meta-col">
              <span className="meta-col-label">Enrollment</span>
              <span className="meta-col-val"><Users size={15} /> {course.studentsCount} Active</span>
            </div>
          </div>
        </div>

        {/* Action Callout Box */}
        <div className="detail-cta-box">
          <div className="cta-header">
            <span className="cta-label">Enrollment Status</span>
            <span className="status-pill-open">Open for Fall 2026</span>
          </div>
          <p className="cta-sub">
            Admissions currently processed online via React Router query navigation.
          </p>
          <button
            type="button"
            className="enroll-now-btn"
            onClick={handleEnrollClick}
          >
            <GraduationCap size={18} /> Apply for Admission
          </button>
          <span className="cta-footnote">
            Navigates programmatically to <code>/admission?course={course.id}</code>
          </span>
        </div>
      </div>

      {/* Two Column Layout: Syllabus & Instructor */}
      <div className="detail-grid-body">
        {/* Left: Syllabus Modules */}
        <div className="syllabus-card">
          <div className="section-head">
            <BookOpen size={20} className="sec-icon" />
            <h2>Curriculum Syllabus Structure</h2>
          </div>

          <div className="syllabus-timeline">
            {course.syllabus.map((item) => (
              <div key={item.week} className="syllabus-item">
                <div className="week-number-badge">Week {item.week}</div>
                <div className="week-topic-text">{item.topic}</div>
              </div>
            ))}
          </div>

          <div className="prerequisites-section">
            <h3>Course Prerequisites:</h3>
            <div className="prereq-pills">
              {course.prerequisites.map((p) => (
                <span key={p} className="prereq-pill">
                  <CheckCircle2 size={13} /> {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Faculty Spotlight */}
        <div className="instructor-spotlight-card">
          <div className="section-head">
            <Users size={20} className="sec-icon" />
            <h2>Course Instructor</h2>
          </div>

          <div className="instructor-profile">
            <h3 className="inst-profile-name">{course.instructor}</h3>
            <span className="inst-profile-role">{course.instructorRole}</span>
            <p className="inst-profile-bio">
              Senior faculty leading research and practical modules in the Department of Computer Science.
            </p>
            <Link to="/faculty" className="view-faculty-link">
              View All Faculty Directory &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
