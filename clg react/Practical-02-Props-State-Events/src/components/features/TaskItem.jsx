import React from 'react';
import { Check, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { Badge } from '../common/Badge';
import './TaskItem.css';

/**
 * TaskItem Functional Component
 * Demonstrates:
 * 1. Props receiving: task object and parent callback functions
 * 2. Event handling: onToggle and onDelete
 * 3. Event bubbling control: e.stopPropagation() on delete button
 */
export const TaskItem = ({ task, onToggle, onDelete }) => {
  const priorityVariants = {
    High: 'rose',
    Medium: 'amber',
    Low: 'cyan'
  };

  const handleRowClick = () => {
    onToggle(task.id);
  };

  const handleDeleteClick = (e) => {
    // CRITICAL DEMONSTRATION OF e.stopPropagation()
    // Prevents the row click (which toggles completion) from triggering when clicking delete
    e.stopPropagation();
    onDelete(task.id);
  };

  return (
    <div
      className={`task-item ${task.completed ? 'task-completed' : ''}`}
      onClick={handleRowClick}
      role="button"
      tabIndex={0}
      title="Click row to toggle completion"
    >
      <div className="task-checkbox-col">
        <button
          type="button"
          className={`custom-checkbox ${task.completed ? 'checked' : ''}`}
          aria-label={task.completed ? 'Mark pending' : 'Mark completed'}
        >
          {task.completed && <Check size={14} />}
        </button>
      </div>

      <div className="task-body-col">
        <h4 className="task-title">{task.title}</h4>
        <div className="task-meta-row">
          <Badge variant={priorityVariants[task.priority] || 'neutral'} size="sm" dot>
            {task.priority} Priority
          </Badge>
          <Badge variant="purple" size="sm">
            {task.category}
          </Badge>
          <span className="task-date">
            <Calendar size={13} /> {task.createdAt}
          </span>
        </div>
      </div>

      <div className="task-actions-col">
        <button
          type="button"
          className="task-delete-btn"
          onClick={handleDeleteClick}
          aria-label="Delete task"
          title="Delete task (demonstrates e.stopPropagation())"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
