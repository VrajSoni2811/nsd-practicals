import React from 'react';
import { Star, Clock, Users, ArrowRight } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import './CourseCard.css';

/**
 * Feature Component: CourseCard
 * Demonstrates:
 * 1. Component Reusability (Composes reusable Card, Badge, and Button)
 * 2. JSX dynamic expression evaluation ({course.title}, {course.price})
 * 3. Conditional rendering of badges
 */
export const CourseCard = ({ course, onEnroll }) => {
  return (
    <Card variant="interactive" padding="none" className="course-card">
      <div className="course-card-top-banner">
        <div className="course-card-badges">
          <Badge variant={course.categoryVariant} pill size="sm">
            {course.category}
          </Badge>
          {course.badge && (
            <Badge variant={course.badgeVariant} dot size="sm">
              {course.badge}
            </Badge>
          )}
        </div>
      </div>

      <div className="course-card-content">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-desc">{course.description}</p>

        <div className="course-instructor">
          <img
            src={course.avatar}
            alt={course.instructor}
            className="instructor-avatar"
            loading="lazy"
          />
          <span className="instructor-name">{course.instructor}</span>
        </div>

        <div className="course-meta">
          <div className="meta-item">
            <Star size={15} className="star-icon" />
            <span className="meta-bold">{course.rating}</span>
          </div>
          <div className="meta-item">
            <Users size={15} />
            <span>{course.students}</span>
          </div>
          <div className="meta-item">
            <Clock size={15} />
            <span>{course.duration}</span>
          </div>
        </div>

        <div className="course-card-footer">
          <div className="course-price">
            <span className="price-label">Tuition</span>
            <span className="price-amount">{course.price}</span>
          </div>
          <Button
            variant="primary"
            size="sm"
            icon={<ArrowRight size={14} />}
            iconPosition="right"
            onClick={() => onEnroll && onEnroll(course)}
          >
            Enroll Now
          </Button>
        </div>
      </div>
    </Card>
  );
};
