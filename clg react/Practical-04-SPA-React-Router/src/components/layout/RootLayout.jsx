import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { StudentLabHeader } from '../common/StudentLabHeader';
import { ChevronRight } from 'lucide-react';
import './RootLayout.css';

export const RootLayout = ({ theme, toggleTheme }) => {
  const location = useLocation();

  // Generate breadcrumb path segments
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <div className="spa-app-layout">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Dynamic Breadcrumbs Bar */}
      <div className="spa-breadcrumbs-bar">
        <div className="breadcrumbs-inner">
          <Link to="/" className="crumb-link">
            Home
          </Link>
          {pathSegments.map((segment, index) => {
            const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;
            const displayName = segment.charAt(0).toUpperCase() + segment.slice(1);

            return (
              <React.Fragment key={url}>
                <ChevronRight size={14} className="crumb-separator" />
                {isLast ? (
                  <span className="crumb-current">{displayName}</span>
                ) : (
                  <Link to={url} className="crumb-link">
                    {displayName}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main Outlet renders child routes */}
      <main className="spa-main-viewport">
        <div className="spa-content-container">
          {/* 1st Semester Student Lab Record Header */}
          <StudentLabHeader
            practicalNo="04"
            aim="Develop a Single Page Application (SPA) using React Router for navigation between multiple pages."
          />
          <Outlet />
        </div>
      </main>

      {/* Persistent Footer */}
      <footer className="spa-footer">
        <div className="footer-inner">
          <div className="footer-text-col">
            <span className="footer-lead">College Web Development & MERN Stack Practicals</span>
            <span className="footer-sub">
              Practical 04: Single Page Application (SPA) using React Router • Outlet Nested Architecture
            </span>
          </div>
          <div className="footer-badge-col">
            <span className="router-badge">React Router v7 / v6</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
