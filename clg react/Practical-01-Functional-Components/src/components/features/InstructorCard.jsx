import React from 'react';
import { Award, BookOpen, Star, Mail } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import './InstructorCard.css';

/**
 * Feature Component: InstructorCard
 * Demonstrates:
 * 1. Functional component with destructured nested props
 * 2. Composing Card, Badge, and Button components
 */
export const InstructorCard = ({ instructor, onContact }) => {
  return (
    <Card variant="glass" padding="md" className="instructor-card">
      <div className="instructor-card-header">
        <img
          src={instructor.avatar}
          alt={instructor.name}
          className="instructor-large-avatar"
        />
        <div className="instructor-info">
          <div className="instructor-name-row">
            <h4 className="instructor-card-name">{instructor.name}</h4>
            <Badge variant={instructor.statusVariant} size="sm" dot>
              {instructor.status}
            </Badge>
          </div>
          <p className="instructor-role">{instructor.role}</p>
        </div>
      </div>

      <p className="instructor-bio">{instructor.bio}</p>

      <div className="instructor-stats-row">
        <div className="inst-stat">
          <BookOpen size={14} />
          <span>{instructor.coursesCount} Courses</span>
        </div>
        <div className="inst-stat">
          <Star size={14} className="star-icon" />
          <span>{instructor.rating} Rating</span>
        </div>
        <div className="inst-stat">
          <Award size={14} />
          <span>{instructor.studentsCount} Students</span>
        </div>
      </div>

      <div className="instructor-action">
        <Button
          variant="secondary"
          size="sm"
          fullWidth
          icon={<Mail size={14} />}
          onClick={() => onContact && onContact(instructor.name)}
        >
          Contact Faculty
        </Button>
      </div>
    </Card>
  );
};
