import React, { useState } from 'react';

export default function UploadModal({ isOpen, onClose, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Technical');
  const [securityClassification, setSecurityClassification] = useState('Internal');
  const [author, setAuthor] = useState('Compliance Specialist');
  const [department, setDepartment] = useState('Engineering');
  const [version, setVersion] = useState('v1.0');
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a document file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title || file.name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('securityClassification', securityClassification);
    formData.append('author', author);
    formData.append('department', department);
    formData.append('version', version);

    setUploading(true);
    try {
      const res = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData
      });
      const result = await res.json();
      if (result.success) {
        onUploadSuccess();
        onClose();
      } else {
        alert(`Ingestion Error: ${result.message}`);
      }
    } catch (err) {
      alert(`Network Error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        <div className="modal-header">
          <h3>Ingest Enterprise Document</h3>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="form-item form-full">
              <label>Select Document File (PDF, DOCX, XLSX, PNG, TXT - Max 10MB) *</label>
              <input
                type="file"
                required
                onChange={(e) => {
                  if (e.target.files.length > 0) {
                    setFile(e.target.files[0]);
                    if (!title) setTitle(e.target.files[0].name.replace(/\.[^/.]+$/, ''));
                  }
                }}
              />
            </div>

            <div className="form-item form-full">
              <label>Document Official Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. ISO 27001 Security Compliance Audit Report"
                required
              />
            </div>

            <div className="form-item form-full">
              <label>Abstract / Purpose Description</label>
              <textarea
                rows="2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of document covenants or engineering specifications..."
              />
            </div>

            <div className="form-item">
              <label>Domain Category *</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Technical">Technical</option>
                <option value="Legal">Legal</option>
                <option value="Financial">Financial</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
                <option value="Architecture">Architecture</option>
              </select>
            </div>

            <div className="form-item">
              <label>Security Classification *</label>
              <select value={securityClassification} onChange={(e) => setSecurityClassification(e.target.value)}>
                <option value="Public">Public</option>
                <option value="Internal">Internal</option>
                <option value="Confidential">Confidential</option>
                <option value="Restricted">Restricted</option>
              </select>
            </div>

            <div className="form-item">
              <label>Author / Owner Name *</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>

            <div className="form-item">
              <label>Department *</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </div>

            <div className="form-item">
              <label>Version Tag</label>
              <input
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="v1.0"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary" disabled={uploading}>
              {uploading ? 'Ingesting Document...' : 'Archive in DMS Repository'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
