import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  Star,
  Users,
  ArrowRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { coursesData } from '../data/coursesData';
import './CoursesPage.css';

export const CoursesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Frontend Engineering', 'Backend Development', 'Full-Stack Engineering', 'Distributed Systems'];

  const filteredCourses = coursesData.filter((c) =>
    selectedCategory === 'All' ? true : c.category === selectedCategory
  );

  return (
    <div className="courses-page animate-fade-in">
      <div className="courses-header">
        <div>
          <span className="page-tag">Academic Modules</span>
          <h1 className="page-title">Curriculum Modules & Courses</h1>
          <p className="page-desc">
            Click on any module to test dynamic parameter routing with <code>&lt;Route path="/courses/:courseId" /&gt;</code> and <code>useParams()</code>.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="cat-filter-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="courses-catalog-grid">
        {filteredCourses.map((course) => (
          <div key={course.id} className="course-card-spa">
            <div className="card-badge-row">
              <span className="course-code-badge">{course.code}</span>
              <span className="course-credits-badge">{course.credits} Credits</span>
            </div>

            <h3 className="course-name">{course.title}</h3>
            <p className="course-short-desc">{course.description}</p>

            <div className="course-stats-strip">
              <div className="stat-item">
                <Clock size={14} />
                <span>{course.duration}</span>
              </div>
              <div className="stat-item">
                <Star size={14} className="star-icon" />
                <span>{course.rating}</span>
              </div>
              <div className="stat-item">
                <Users size={14} />
                <span>{course.studentsCount}</span>
              </div>
            </div>

            <div className="instructor-row">
              <span className="inst-label">Faculty:</span>
              <span className="inst-name">{course.instructor}</span>
            </div>

            <div className="card-action-footer">
              <Link to={`/courses/${course.id}`} className="view-details-btn">
                <span>View Full Syllabus & Details</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
