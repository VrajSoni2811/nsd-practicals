import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Users,
  UserPlus,
  BookOpen,
  Sun,
  Moon,
  Award,
  CheckCircle2,
  XCircle,
  Building2,
  TrendingUp
} from 'lucide-react';
import { StudentForm } from './components/features/StudentForm';
import { StudentList } from './components/features/StudentList';
import { LabManualSection } from './components/features/LabManualSection';
import { Badge } from './components/common/Badge';
import { Card } from './components/common/Card';
import { StudentLabHeader } from './components/common/StudentLabHeader';
import { initialStudents } from './data/studentsData';
import './App.css';

export function App() {
  const [activeTab, setActiveTab] = useState('directory'); // 'directory' | 'form' | 'manual'
  const [theme, setTheme] = useState('dark');
  const [students, setStudents] = useState(initialStudents);
  const [editingStudent, setEditingStudent] = useState(null);
  const [toast, setToast] = useState(null);

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // CREATE OR UPDATE STUDENT HANDLER
  const handleSaveStudent = (studentData) => {
    if (editingStudent) {
      // Update existing record
      setStudents((prev) =>
        prev.map((s) => (s.id === studentData.id ? studentData : s))
      );
      setEditingStudent(null);
      showToast('success', `Record for "${studentData.fullName}" (${studentData.rollNo}) was successfully updated!`);
    } else {
      // Check for duplicate Roll Number
      const isDuplicate = students.some(
        (s) => s.rollNo.toUpperCase() === studentData.rollNo.toUpperCase()
      );
      if (isDuplicate) {
        showToast('error', `A student with Roll No "${studentData.rollNo}" already exists!`);
        return;
      }

      setStudents((prev) => [studentData, ...prev]);
      showToast('success', `Student "${studentData.fullName}" (${studentData.rollNo}) enrolled successfully!`);
    }

    setActiveTab('directory');
  };

  // DELETE STUDENT HANDLER
  const handleDeleteStudent = (id) => {
    const student = students.find((s) => s.id === id);
    if (window.confirm(`Are you sure you want to delete ${student?.fullName} (${student?.rollNo})?`)) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
      showToast('info', `Removed ${student?.fullName} from student records.`);
    }
  };

  // START EDIT HANDLER
  const handleStartEdit = (student) => {
    setEditingStudent(student);
    setActiveTab('form');
  };

  // CANCEL EDIT HANDLER
  const handleCancelEdit = () => {
    setEditingStudent(null);
    setActiveTab('directory');
  };

  // COMPUTED STATS
  const totalStudents = students.length;
  const uniqueDepts = new Set(students.map((s) => s.department)).size;
  const avgCgpa =
    totalStudents > 0
      ? (students.reduce((acc, s) => acc + parseFloat(s.cgpa || 0), 0) / totalStudents).toFixed(2)
      : '0.00';
  const highestCgpa =
    totalStudents > 0
      ? Math.max(...students.map((s) => parseFloat(s.cgpa || 0))).toFixed(2)
      : '0.00';

  return (
    <div className="app-layout">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast-notification toast-${toast.type} animate-slide-down`}>
          {toast.type === 'error' ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="top-navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="brand-icon-box">
              <GraduationCap size={22} className="brand-icon" />
            </div>
            <div className="brand-text">
              <div className="brand-row">
                <span className="brand-title">EduPortal SMS</span>
                <Badge variant="primary" size="sm" pill>
                  Practical 03
                </Badge>
              </div>
              <span className="brand-subtitle">
                Controlled Components, Forms & Validation
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="nav-tabs" aria-label="Main Navigation">
            <button
              className={`nav-tab-btn ${activeTab === 'directory' ? 'active' : ''}`}
              onClick={() => setActiveTab('directory')}
            >
              <Users size={16} />
              <span>Student Directory ({totalStudents})</span>
            </button>
            <button
              className={`nav-tab-btn ${activeTab === 'form' ? 'active' : ''}`}
              onClick={() => setActiveTab('form')}
            >
              <UserPlus size={16} />
              <span>{editingStudent ? 'Edit Student' : 'Enroll Student'}</span>
            </button>
            <button
              className={`nav-tab-btn ${activeTab === 'manual' ? 'active' : ''}`}
              onClick={() => setActiveTab('manual')}
            >
              <BookOpen size={16} />
              <span>Lab Manual & Viva</span>
            </button>
          </nav>

          {/* Theme Switcher */}
          <div className="nav-actions">
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          {/* 1st Semester Student Lab Record Header */}
          <StudentLabHeader
            practicalNo="03"
            aim="Create a Student Management System using React Forms, Controlled Components and Validation."
          />

          {/* Analytics Strip */}
          <div className="academic-stats-grid">
            <div className="acad-stat-card">
              <div className="acad-stat-header">
                <span>Enrolled Students</span>
                <Users size={18} className="stat-icon-indigo" />
              </div>
              <div className="acad-stat-val">{totalStudents}</div>
              <span className="acad-stat-sub">Active Academic Records</span>
            </div>

            <div className="acad-stat-card">
              <div className="acad-stat-header">
                <span>Departments</span>
                <Building2 size={18} className="stat-icon-cyan" />
              </div>
              <div className="acad-stat-val">{uniqueDepts}</div>
              <span className="acad-stat-sub">Discipline Branches</span>
            </div>

            <div className="acad-stat-card">
              <div className="acad-stat-header">
                <span>Average CGPA</span>
                <TrendingUp size={18} className="stat-icon-emerald" />
              </div>
              <div className="acad-stat-val">{avgCgpa}</div>
              <span className="acad-stat-sub">Scale 0.00 - 10.00</span>
            </div>

            <div className="acad-stat-card">
              <div className="acad-stat-header">
                <span>Highest CGPA</span>
                <Award size={18} className="stat-icon-amber" />
              </div>
              <div className="acad-stat-val">{highestCgpa}</div>
              <span className="acad-stat-sub">Top Merit Distinction</span>
            </div>
          </div>

          {/* TAB 1: STUDENT DIRECTORY */}
          {activeTab === 'directory' && (
            <div className="animate-fade-in">
              <StudentList
                students={students}
                onEditStudent={handleStartEdit}
                onDeleteStudent={handleDeleteStudent}
                onAddNewClick={() => {
                  setEditingStudent(null);
                  setActiveTab('form');
                }}
              />
            </div>
          )}

          {/* TAB 2: REGISTER / EDIT FORM */}
          {activeTab === 'form' && (
            <div className="animate-fade-in">
              <StudentForm
                onSaveStudent={handleSaveStudent}
                editingStudent={editingStudent}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          )}

          {/* TAB 3: LAB MANUAL & VIVA */}
          {activeTab === 'manual' && (
            <div className="animate-fade-in">
              <LabManualSection />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-container">
          <div className="footer-left">
            <span className="footer-title">College Web Development & MERN Stack Practicals</span>
            <span className="footer-copy">
              Practical 03: Student Management System (Controlled Forms & Validation) • Standalone Vite Project
            </span>
          </div>
          <div className="footer-right">
            <Badge variant="neutral" size="sm">
              React 19 • Forms Engine
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
