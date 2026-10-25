import React, { useState } from 'react';
import {
  Search,
  Filter,
  LayoutGrid,
  Table as TableIcon,
  Edit3,
  Trash2,
  Download,
  GraduationCap,
  Mail,
  Phone,
  Award
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Card } from '../common/Card';
import './StudentList.css';

/**
 * StudentList Feature Component
 * Demonstrates:
 * 1. Filterable, searchable student directory
 * 2. Toggleable Table View vs Cards Grid View
 * 3. Lifting edit/delete action events to parent
 * 4. Client-side CSV data export feature
 */
export const StudentList = ({ students, onEditStudent, onDeleteStudent, onAddNewClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'

  // Filter logic
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = selectedDept === 'All' || s.department === selectedDept;

    return matchesSearch && matchesDept;
  });

  // Export to CSV generator
  const exportCSV = () => {
    const headers = ['Roll No', 'Full Name', 'Email', 'Phone', 'Department', 'Semester', 'CGPA', 'Skills'];
    const rows = filteredStudents.map((s) => [
      s.rollNo,
      `"${s.fullName}"`,
      s.email,
      s.phone,
      `"${s.department}"`,
      s.semester,
      s.cgpa,
      `"${(s.skills || []).join(', ')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `student_records_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="student-list-container">
      {/* Top Filter & Action Bar */}
      <div className="list-toolbar">
        <div className="search-input-group">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by Roll No, Name, or Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="toolbar-controls">
          <select
            className="dept-filter-select"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            <option value="All">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="AI & Data Science">AI & Data Science</option>
            <option value="Electronics & Communication">Electronics</option>
          </select>

          {/* View toggle */}
          <div className="view-toggle-btns">
            <button
              type="button"
              className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Table View"
            >
              <TableIcon size={16} />
            </button>
            <button
              type="button"
              className={`view-btn ${viewMode === 'cards' ? 'active' : ''}`}
              onClick={() => setViewMode('cards')}
              title="Cards View"
            >
              <LayoutGrid size={16} />
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            icon={<Download size={15} />}
            onClick={exportCSV}
            disabled={filteredStudents.length === 0}
          >
            Export CSV
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onAddNewClick}
          >
            + New Student
          </Button>
        </div>
      </div>

      {/* Results Count & Badges */}
      <div className="list-meta-bar">
        <span className="results-text">
          Showing <strong>{filteredStudents.length}</strong> of <strong>{students.length}</strong> enrolled students
        </span>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="empty-list-card">
          <GraduationCap size={44} className="empty-icon" />
          <h3>No student records found</h3>
          <p>Try modifying your search keywords or department filter.</p>
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="table-responsive-wrapper">
          <table className="students-data-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Details</th>
                <th>Department</th>
                <th>Semester</th>
                <th>CGPA</th>
                <th>Skills & Tech</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s.id}>
                  <td>
                    <span className="roll-badge">{s.rollNo}</span>
                  </td>
                  <td>
                    <div className="student-name-block">
                      <span className="student-name">{s.fullName}</span>
                      <span className="student-email">{s.email}</span>
                    </div>
                  </td>
                  <td>
                    <Badge variant="cyan" size="sm">
                      {s.department}
                    </Badge>
                  </td>
                  <td>
                    <span className="sem-text">Sem {s.semester}</span>
                  </td>
                  <td>
                    <span className="cgpa-highlight">{s.cgpa}</span>
                  </td>
                  <td>
                    <div className="skills-pill-wrap">
                      {(s.skills || []).map((sk) => (
                        <span key={sk} className="mini-skill-pill">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="row-action-btns">
                      <button
                        type="button"
                        className="action-icon-btn edit-btn"
                        onClick={() => onEditStudent(s)}
                        title="Edit Student"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        type="button"
                        className="action-icon-btn delete-btn"
                        onClick={() => onDeleteStudent(s.id)}
                        title="Delete Student"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* CARDS GRID VIEW */
        <div className="students-cards-grid">
          {filteredStudents.map((s) => (
            <Card key={s.id} variant="glass" padding="md" className="student-card-item">
              <div className="card-top-row">
                <span className="roll-badge">{s.rollNo}</span>
                <Badge variant="emerald" size="sm" dot>
                  CGPA {s.cgpa}
                </Badge>
              </div>

              <h3 className="card-student-name">{s.fullName}</h3>
              <p className="card-dept-name">{s.department} • Sem {s.semester}</p>

              <div className="card-contact-info">
                <div className="contact-line">
                  <Mail size={13} /> <span>{s.email}</span>
                </div>
                <div className="contact-line">
                  <Phone size={13} /> <span>{s.phone}</span>
                </div>
              </div>

              <div className="card-skills-row">
                {(s.skills || []).map((sk) => (
                  <Badge key={sk} variant="purple" size="sm">
                    {sk}
                  </Badge>
                ))}
              </div>

              <div className="card-footer-actions">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<Edit3 size={14} />}
                  onClick={() => onEditStudent(s)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  icon={<Trash2 size={14} />}
                  onClick={() => onDeleteStudent(s.id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
