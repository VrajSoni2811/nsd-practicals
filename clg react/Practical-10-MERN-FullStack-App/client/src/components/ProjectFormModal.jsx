import React, { useState } from 'react';

export default function ProjectFormModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'FullStack',
    status: 'In-Progress',
    priority: 'Medium',
    lead: '',
    budget: '',
    completionPercentage: 10
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.lead || !formData.budget) {
      alert('Please fill all required fields.');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        <div className="modal-header">
          <h3>Create New Sprint Project</h3>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="form-item form-group-full">
              <label>Project Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Distributed Auth Gateway"
                required
              />
            </div>

            <div className="form-item form-group-full">
              <label>Description</label>
              <textarea
                name="description"
                rows="2"
                value={formData.description}
                onChange={handleChange}
                placeholder="Core deliverables and sprint focus..."
              />
            </div>

            <div className="form-item">
              <label>Domain Category</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="FullStack">FullStack</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Mobile">Mobile</option>
                <option value="DevOps">DevOps</option>
              </select>
            </div>

            <div className="form-item">
              <label>Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div className="form-item">
              <label>Project Lead *</label>
              <input
                type="text"
                name="lead"
                value={formData.lead}
                onChange={handleChange}
                placeholder="e.g. Rahul Verma"
                required
              />
            </div>

            <div className="form-item">
              <label>Budget (₹) *</label>
              <input
                type="number"
                name="budget"
                min="5000"
                value={formData.budget}
                onChange={handleChange}
                placeholder="450000"
                required
              />
            </div>

            <div className="form-item">
              <label>Initial Progress ({formData.completionPercentage}%)</label>
              <input
                type="range"
                name="completionPercentage"
                min="0"
                max="100"
                value={formData.completionPercentage}
                onChange={handleChange}
              />
            </div>

            <div className="form-item">
              <label>Initial Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Backlog">Backlog</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Review">Review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Save to MongoDB</button>
          </div>
        </form>
      </div>
    </div>
  );
}
