import React, { useState, useEffect } from 'react';
import {
  LayoutGrid,
  Sliders,
  BookOpen,
  Sun,
  Moon,
  GraduationCap
} from 'lucide-react';
import { Button } from './components/common/Button';
import { Badge } from './components/common/Badge';
import { StatCard } from './components/common/StatCard';
import { AlertBanner } from './components/common/AlertBanner';
import { CourseCard } from './components/features/CourseCard';
import { InstructorCard } from './components/features/InstructorCard';
import { PropPlayground } from './components/features/PropPlayground';
import { LabManualSection } from './components/features/LabManualSection';
import { StudentLabHeader } from './components/common/StudentLabHeader';
import { coursesData, instructorsData } from './data/coursesData';
import { statsData } from './data/statsData';
import './App.css';

export function App() {
  const [activeTab, setActiveTab] = useState('showcase'); // 'showcase' | 'playground' | 'manual'
  const [theme, setTheme] = useState('dark');
  const [notification, setNotification] = useState(null);

  // Sync theme attribute to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleEnroll = (course) => {
    setNotification({
      type: 'success',
      title: 'Enrollment Confirmed!',
      message: `You have successfully enrolled in "${course.title}". Check your student portal.`
    });
  };

  const handleContactFaculty = (name) => {
    setNotification({
      type: 'info',
      title: 'Faculty Inquiry Sent',
      message: `Your message request was dispatched to ${name}. Expect an email reply shortly.`
    });
  };

  return (
    <div className="app-layout">
      {/* Top Navbar */}
      <header className="top-navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="brand-icon-box">
              <GraduationCap size={22} className="brand-icon" />
            </div>
            <div className="brand-text">
              <div className="brand-row">
                <span className="brand-title">EduLearn Lab</span>
                <Badge variant="primary" size="sm" pill>
                  Practical 01
                </Badge>
              </div>
              <span className="brand-subtitle">
                Functional Components, JSX & Reusability
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="nav-tabs" aria-label="Main Navigation">
            <button
              className={`nav-tab-btn ${activeTab === 'showcase' ? 'active' : ''}`}
              onClick={() => setActiveTab('showcase')}
            >
              <LayoutGrid size={16} />
              <span>Live Showcase</span>
            </button>
            <button
              className={`nav-tab-btn ${activeTab === 'playground' ? 'active' : ''}`}
              onClick={() => setActiveTab('playground')}
            >
              <Sliders size={16} />
              <span>Props Playground</span>
            </button>
            <button
              className={`nav-tab-btn ${activeTab === 'manual' ? 'active' : ''}`}
              onClick={() => setActiveTab('manual')}
            >
              <BookOpen size={16} />
              <span>Lab Manual & Viva</span>
            </button>
          </nav>

          {/* Header Actions */}
          <div className="nav-actions">
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle light/dark theme"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="main-content">
        <div className="content-container">
          {/* 1st Semester Student Lab Record Header */}
          <StudentLabHeader
            practicalNo="01"
            aim="Build a React application using Functional Components, JSX and Component Reusability concepts."
          />

          {/* Dynamic Toast / Notification Banner */}
          {notification && (
            <AlertBanner
              type={notification.type}
              title={notification.title}
              message={notification.message}
              onClose={() => setNotification(null)}
            />
          )}

          {/* TAB 1: LIVE SHOWCASE */}
          {activeTab === 'showcase' && (
            <div className="tab-showcase animate-fade-in">
              {/* Hero Banner */}
              <div className="hero-banner">
                <div className="hero-content">
                  <Badge variant="primary" size="md" pill dot>
                    React 19 Functional Architecture
                  </Badge>
                  <h1 className="hero-heading">
                    Component Reusability in Modern React
                  </h1>
                  <p className="hero-description">
                    This practical demonstrates how high-order user interfaces are constructed by composing atomic, reusable functional components. Notice how identical primitive components (Buttons, Badges, and Cards) dynamically reconfigure using props.
                  </p>
                  <div className="hero-actions">
                    <Button
                      variant="gradient"
                      size="md"
                      icon={<Sliders size={16} />}
                      onClick={() => setActiveTab('playground')}
                    >
                      Open Props Playground
                    </Button>
                    <Button
                      variant="secondary"
                      size="md"
                      icon={<BookOpen size={16} />}
                      onClick={() => setActiveTab('manual')}
                    >
                      View Viva & Theory Guide
                    </Button>
                  </div>
                </div>
              </div>

              {/* Analytics Metric Cards Grid */}
              <section className="section-block">
                <div className="section-header-compact">
                  <h2 className="section-heading-sm">Key Academic Metrics</h2>
                  <Badge variant="cyan" size="sm">
                    Live Data Mapping
                  </Badge>
                </div>
                <div className="stats-grid">
                  {statsData.map((stat) => (
                    <StatCard
                      key={stat.id}
                      title={stat.title}
                      value={stat.value}
                      change={stat.change}
                      isPositive={stat.isPositive}
                      accent={stat.accent}
                      subtitle={stat.subtitle}
                    />
                  ))}
                </div>
              </section>

              {/* Course Catalog (Array.map + Reusable CourseCard) */}
              <section className="section-block">
                <div className="section-header-row">
                  <div>
                    <h2 className="section-main-heading">Featured Curriculum Modules</h2>
                    <p className="section-subtext">
                      Rendered using <code>Array.prototype.map()</code> with unique <code>key</code> props and the reusable <code>CourseCard</code> functional component.
                    </p>
                  </div>
                  <Badge variant="purple" size="md">
                    {coursesData.length} Courses Available
                  </Badge>
                </div>

                <div className="courses-grid">
                  {coursesData.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onEnroll={handleEnroll}
                    />
                  ))}
                </div>
              </section>

              {/* Faculty Section (Reusable InstructorCard) */}
              <section className="section-block">
                <div className="section-header-row">
                  <div>
                    <h2 className="section-main-heading">Course Faculty & Instructors</h2>
                    <p className="section-subtext">
                      Demonstrating component reusability with distinct instructor data models.
                    </p>
                  </div>
                </div>

                <div className="instructors-grid">
                  {instructorsData.map((inst) => (
                    <InstructorCard
                      key={inst.id}
                      instructor={inst}
                      onContact={handleContactFaculty}
                    />
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* TAB 2: PROPS PLAYGROUND */}
          {activeTab === 'playground' && (
            <div className="animate-fade-in">
              <PropPlayground />
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
              Practical 01: Functional Components, JSX & Reusability • Separate Folder Workspace
            </span>
          </div>
          <div className="footer-right">
            <Badge variant="neutral" size="sm">
              React 19 + Vite 8
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
