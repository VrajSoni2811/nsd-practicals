import React, { useState } from 'react';
import {
  Plus,
  Search,
  CheckCheck,
  RotateCcw,
  ListTodo,
  Sparkles,
  Filter,
  Trash
} from 'lucide-react';
import { TaskItem } from './TaskItem';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Card } from '../common/Card';
import './TaskBoard.css';

/**
 * TaskBoard Feature Component
 * Demonstrates:
 * 1. Array State Management with pure immutability (spread operator, filter, map)
 * 2. Controlled form component with useState
 * 3. SyntheticEvent handling (onSubmit, onChange, onClick, onKeyDown)
 * 4. Lifting state up / callback propagation via onLogEvent
 */
export const TaskBoard = ({ tasks, setTasks, onLogEvent }) => {
  // Form input state
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Lab Work');

  // Filter & Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'completed'

  // Undo state snapshot
  const [lastDeleted, setLastDeleted] = useState(null);

  // FORM SUBMIT EVENT HANDLER
  const handleAddTask = (e) => {
    // Prevent default browser page reload
    e.preventDefault();

    if (!title.trim()) {
      alert('Task title cannot be empty!');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      priority,
      category,
      completed: false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Pure immutable array update: spread previous tasks
    setTasks((prev) => [newTask, ...prev]);

    // Reset controlled inputs
    setTitle('');

    // Log the event for the Live Event Inspector
    onLogEvent({
      type: 'onSubmit',
      target: 'AddTaskForm',
      details: `Added new task "${newTask.title}" (${newTask.priority} Priority)`
    });
  };

  // TOGGLE STATUS EVENT HANDLER
  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

    const target = tasks.find((t) => t.id === id);
    onLogEvent({
      type: 'onClick',
      target: `TaskItem #${id}`,
      details: `Toggled status of "${target?.title}" to ${!target?.completed ? 'Completed' : 'Pending'}`
    });
  };

  // DELETE TASK EVENT HANDLER (With Undo capability)
  const handleDeleteTask = (id) => {
    const taskToDelete = tasks.find((t) => t.id === id);
    setLastDeleted(taskToDelete);

    // Pure immutable deletion: filter
    setTasks((prev) => prev.filter((t) => t.id !== id));

    onLogEvent({
      type: 'onClick (e.stopPropagation)',
      target: `DeleteButton #${id}`,
      details: `Deleted task "${taskToDelete?.title}". Stored in Undo buffer.`
    });
  };

  // UNDO LAST DELETION
  const handleUndo = () => {
    if (!lastDeleted) return;

    setTasks((prev) => [lastDeleted, ...prev]);
    onLogEvent({
      type: 'onClick',
      target: 'UndoButton',
      details: `Restored deleted task "${lastDeleted.title}" from state snapshot.`
    });
    setLastDeleted(null);
  };

  // BATCH ACTIONS
  const handleMarkAllCompleted = () => {
    setTasks((prev) => prev.map((t) => ({ ...t, completed: true })));
    onLogEvent({
      type: 'onClick',
      target: 'BatchMarkComplete',
      details: 'Marked all tasks as completed.'
    });
  };

  const handleClearCompleted = () => {
    const count = tasks.filter((t) => t.completed).length;
    setTasks((prev) => prev.filter((t) => !t.completed));
    onLogEvent({
      type: 'onClick',
      target: 'BatchClearCompleted',
      details: `Cleared ${count} completed tasks.`
    });
  };

  // FILTERED TASKS COMPUTATION
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (statusFilter === 'pending') return matchesSearch && !task.completed;
    if (statusFilter === 'completed') return matchesSearch && task.completed;
    return matchesSearch;
  });

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="taskboard-container">
      {/* Undo Notification Bar */}
      {lastDeleted && (
        <div className="undo-banner animate-slide-down">
          <span>Deleted task: <strong>"{lastDeleted.title}"</strong></span>
          <Button
            variant="outline"
            size="sm"
            icon={<RotateCcw size={14} />}
            onClick={handleUndo}
          >
            Undo Deletion
          </Button>
        </div>
      )}

      {/* Top: Add New Task Controlled Form */}
      <Card variant="glass" padding="md" className="add-task-card">
        <form onSubmit={handleAddTask} className="add-task-form">
          <div className="form-row-main">
            <div className="input-with-icon">
              <input
                type="text"
                className="task-text-input"
                placeholder="Enter new task description (e.g. Implement controlled component)..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  onLogEvent({
                    type: 'onChange',
                    target: 'TaskTitleInput',
                    details: `Input value: "${e.target.value}"`
                  });
                }}
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={<Plus size={16} />}
            >
              Add Task
            </Button>
          </div>

          <div className="form-row-options">
            <div className="option-group">
              <label className="option-label">Priority:</label>
              <select
                className="task-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <div className="option-group">
              <label className="option-label">Category:</label>
              <select
                className="task-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Academics">Academics</option>
                <option value="Lab Work">Lab Work</option>
                <option value="Exam Prep">Exam Prep</option>
                <option value="General">General</option>
              </select>
            </div>

            <div className="shortcut-tip">
              <Sparkles size={13} />
              <span>Press <strong>Enter</strong> to submit via <code>onSubmit</code> synthetic event</span>
            </div>
          </div>
        </form>
      </Card>

      {/* Filter & Search Bar */}
      <div className="task-toolbar">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by task title or category..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onLogEvent({
                type: 'onChange',
                target: 'SearchQueryInput',
                details: `Filter text: "${e.target.value}"`
              });
            }}
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="status-filter-pills">
          <button
            type="button"
            className={`filter-pill ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => {
              setStatusFilter('all');
              onLogEvent({ type: 'onClick', target: 'FilterPill', details: 'Filter: all' });
            }}
          >
            All ({tasks.length})
          </button>
          <button
            type="button"
            className={`filter-pill ${statusFilter === 'pending' ? 'active' : ''}`}
            onClick={() => {
              setStatusFilter('pending');
              onLogEvent({ type: 'onClick', target: 'FilterPill', details: 'Filter: pending' });
            }}
          >
            Pending ({pendingCount})
          </button>
          <button
            type="button"
            className={`filter-pill ${statusFilter === 'completed' ? 'active' : ''}`}
            onClick={() => {
              setStatusFilter('completed');
              onLogEvent({ type: 'onClick', target: 'FilterPill', details: 'Filter: completed' });
            }}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Batch Operations */}
        <div className="batch-actions">
          <Button
            variant="secondary"
            size="sm"
            icon={<CheckCheck size={14} />}
            onClick={handleMarkAllCompleted}
            disabled={pendingCount === 0}
          >
            Mark All Done
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={<Trash size={14} />}
            onClick={handleClearCompleted}
            disabled={completedCount === 0}
          >
            Clear Done
          </Button>
        </div>
      </div>

      {/* Task List */}
      <div className="tasks-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <ListTodo size={40} className="empty-icon" />
            <h3>No tasks match your filter</h3>
            <p>Try searching for a different keyword or create a new task above.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};
