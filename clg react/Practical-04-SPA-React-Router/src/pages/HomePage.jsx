import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Users,
  Compass,
  CheckCircle,
  Award,
  Layers
} from 'lucide-react';
import { coursesData } from '../data/coursesData';
import './HomePage.css';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Showcase Banner */}
      <section className="spa-hero">
        <div className="hero-pill-badge">
          <Sparkles size={14} /> React Router v7 • Zero Page Reloads
        </div>
        <h1 className="hero-main-title">
          Modern Single Page Application Architecture
        </h1>
        <p className="hero-main-sub">
          Welcome to the Academia Curriculum Portal. This practical demonstrates how client-side routing enables instantaneous, seamless transitions across pages without issuing round-trip HTTP requests for new HTML documents.
        </p>

        <div className="hero-cta-buttons">
          <Link to="/courses" className="btn-primary-link">
            <BookOpen size={17} /> Explore Curriculum ({coursesData.length})
          </Link>
          <Link to="/admission" className="btn-secondary-link">
            <GraduationCap size={17} /> Apply for Admission <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="stats-row">
        <div className="stat-box">
          <span className="stat-number">4</span>
          <span className="stat-label">Core Modules</span>
          <span className="stat-caption">MERN Curriculum</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">100%</span>
          <span className="stat-label">Client Routing</span>
          <span className="stat-caption">HTML5 History API</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">0ms</span>
          <span className="stat-label">Reload Latency</span>
          <span className="stat-caption">SPA Dynamic DOM</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">8</span>
          <span className="stat-label">Viva Questions</span>
          <span className="stat-caption">Exam Ready</span>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="spa-features-grid">
        <div className="feature-card" onClick={() => navigate('/courses')}>
          <div className="card-icon-wrap icon-indigo">
            <BookOpen size={22} />
          </div>
          <h3>Curriculum Catalog</h3>
          <p>
            Browse all specialized modules with dynamic route links powered by <code>&lt;Link to="/courses/:id"&gt;</code>.
          </p>
          <span className="card-explore-link">
            Browse Courses <ArrowRight size={14} />
          </span>
        </div>

        <div className="feature-card" onClick={() => navigate('/faculty')}>
          <div className="card-icon-wrap icon-cyan">
            <Users size={22} />
          </div>
          <h3>Distinguished Faculty</h3>
          <p>
            Meet academic chairs and course instructors leading the MERN development modules.
          </p>
          <span className="card-explore-link">
            View Profiles <ArrowRight size={14} />
          </span>
        </div>

        <div className="feature-card" onClick={() => navigate('/manual')}>
          <div className="card-icon-wrap icon-emerald">
            <Layers size={22} />
          </div>
          <h3>SPA Theory & Viva</h3>
          <p>
            Study the differences between SPA and MPA, <code>useParams</code>, <code>useNavigate</code>, and university exam Q&A.
          </p>
          <span className="card-explore-link">
            Open Lab Manual <ArrowRight size={14} />
          </span>
        </div>
      </section>
    </div>
  );
};
