import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Compass,
  BookOpen,
  Users,
  GraduationCap,
  FileText,
  Sun,
  Moon,
  Home
} from 'lucide-react';
import './Navbar.css';

export const Navbar = ({ theme, toggleTheme }) => {
  return (
    <header className="spa-navbar">
      <div className="nav-inner-container">
        {/* Brand Link */}
        <Link to="/" className="nav-brand-link">
          <div className="brand-logo-badge">
            <Compass size={22} />
          </div>
          <div className="brand-titles">
            <div className="brand-name-row">
              <span className="brand-main">Academia SPA</span>
              <span className="practical-tag">Practical 04</span>
            </div>
            <span className="brand-desc">React Router v7 • Client-Side Navigation</span>
          </div>
        </Link>

        {/* Declarative NavLinks with isActive highlight */}
        <nav className="spa-nav-links" aria-label="SPA Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `spa-nav-item ${isActive ? 'active' : ''}`}
          >
            <Home size={15} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/courses"
            className={({ isActive }) => `spa-nav-item ${isActive ? 'active' : ''}`}
          >
            <BookOpen size={15} />
            <span>Curriculum</span>
          </NavLink>

          <NavLink
            to="/faculty"
            className={({ isActive }) => `spa-nav-item ${isActive ? 'active' : ''}`}
          >
            <Users size={15} />
            <span>Faculty</span>
          </NavLink>

          <NavLink
            to="/admission"
            className={({ isActive }) => `spa-nav-item ${isActive ? 'active' : ''}`}
          >
            <GraduationCap size={15} />
            <span>Admissions</span>
          </NavLink>

          <NavLink
            to="/manual"
            className={({ isActive }) => `spa-nav-item ${isActive ? 'active' : ''}`}
          >
            <FileText size={15} />
            <span>Lab Manual & Viva</span>
          </NavLink>
        </nav>

        {/* Actions */}
        <div className="nav-right-actions">
          <button
            type="button"
            className="theme-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="Toggle light/dark theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};
