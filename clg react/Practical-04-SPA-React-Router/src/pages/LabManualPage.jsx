import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  FileCode,
  Layers,
  HelpCircle,
  Compass
} from 'lucide-react';
import { vivaQuestionsPractical4 } from '../data/coursesData';
import './LabManualPage.css';

export const LabManualPage = () => {
  const [expandedViva, setExpandedViva] = useState(1);

  const toggleViva = (id) => {
    setExpandedViva(expandedViva === id ? null : id);
  };

  return (
    <div className="lab-manual-container animate-fade-in">
      <div className="manual-banner">
        <span className="manual-pill">Curriculum Lab Manual</span>
        <h1 className="manual-title">Practical 04: Single Page Application (SPA) Routing</h1>
        <p className="manual-subtitle">
          University laboratory manual for React Router v6/v7, dynamic segment parameters, programmatic navigation, layout wrapping with Outlet, and SPA vs MPA architectural analysis.
        </p>
      </div>

      <div className="manual-details-grid">
        <div className="manual-card">
          <div className="manual-card-head">
            <BookOpen size={18} />
            <h3>Aim & Objectives</h3>
          </div>
          <p className="manual-text">
            <strong>Aim:</strong> To develop a robust <strong>Single Page Application (SPA)</strong> using <strong>React Router</strong> for declarative client-side navigation between multiple views with zero full-page browser reloads.
          </p>
          <ul className="manual-list">
            <li><CheckCircle size={14} /> Configure <code>BrowserRouter</code>, <code>Routes</code>, and <code>Route</code> hierarchies.</li>
            <li><CheckCircle size={14} /> Implement dynamic path parameters with <code>useParams()</code> (e.g. <code>/courses/:courseId</code>).</li>
            <li><CheckCircle size={14} /> Perform programmatic redirection via <code>useNavigate()</code>.</li>
            <li><CheckCircle size={14} /> Establish persistent layouts with nested routes and <code>&lt;Outlet /&gt;</code>.</li>
          </ul>
        </div>

        <div className="manual-card">
          <div className="manual-card-head">
            <Compass size={18} />
            <h3>React Router Core API Surface</h3>
          </div>
          <table className="manual-table">
            <tbody>
              <tr>
                <td><strong>BrowserRouter:</strong></td>
                <td>Stores current location in browser URL using HTML5 History API</td>
              </tr>
              <tr>
                <td><strong>Routes &amp; Route:</strong></td>
                <td>Matches current pathname to appropriate component tree</td>
              </tr>
              <tr>
                <td><strong>NavLink:</strong></td>
                <td>Renders navigation anchor with built-in <code>isActive</code> state</td>
              </tr>
              <tr>
                <td><strong>useParams():</strong></td>
                <td>Extracts dynamic colon parameters from route path string</td>
              </tr>
              <tr>
                <td><strong>useNavigate():</strong></td>
                <td>Enables imperative, programmatic transitions in event handlers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SPA vs MPA Comparison */}
      <div className="manual-section-block">
        <div className="section-head-row">
          <FileCode size={20} />
          <h3>SPA (Single Page Application) vs MPA (Multi-Page Application)</h3>
        </div>
        <div className="table-responsive">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Criteria</th>
                <th>Single Page Application (SPA)</th>
                <th>Multi-Page Application (MPA)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Page Reloads</strong></td>
                <td><strong>Zero reloads</strong>; dynamic client-side DOM rewrites</td>
                <td>Every interaction triggers full HTML page reload from server</td>
              </tr>
              <tr>
                <td><strong>Routing Engine</strong></td>
                <td>Client-side JavaScript (React Router / History API)</td>
                <td>Web Server (Apache, Nginx, Express page endpoints)</td>
              </tr>
              <tr>
                <td><strong>Performance / UX</strong></td>
                <td>Instantaneous screen transitions, native-app feel</td>
                <td>Flashes of white screen, higher latency across requests</td>
              </tr>
              <tr>
                <td><strong>State Persistence</strong></td>
                <td>Global React state remains alive across page routes</td>
                <td>State is wiped out on every page navigation</td>
              </tr>
              <tr>
                <td><strong>Initial Load Time</strong></td>
                <td>Slightly higher initial JS bundle download</td>
                <td>Faster initial load of plain HTML document</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Viva Voce Questions Section */}
      <div className="manual-section-block">
        <div className="section-head-row">
          <HelpCircle size={20} />
          <h3>Viva Voce Questions & Answers</h3>
        </div>
        <div className="viva-accordion-list">
          {vivaQuestionsPractical4.map((item) => (
            <div
              key={item.id}
              className={`viva-item ${expandedViva === item.id ? 'expanded' : ''}`}
            >
              <button
                className="viva-question-btn"
                onClick={() => toggleViva(item.id)}
              >
                <span className="viva-number">Q{item.id}.</span>
                <span className="viva-question-text">{item.question}</span>
                {expandedViva === item.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {expandedViva === item.id && (
                <div className="viva-answer-content">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
