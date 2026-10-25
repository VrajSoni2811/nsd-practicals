import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  FileCode,
  Layers,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { vivaQuestionsPractical3 } from '../../data/studentsData';
import { Badge } from '../common/Badge';
import { Card } from '../common/Card';
import './LabManualSection.css';

/**
 * LabManualSection Component for Practical 03
 * Demonstrates:
 * 1. Controlled vs Uncontrolled form component theory
 * 2. Form validation lifecycle & regex patterns
 * 3. 8 University Viva Voce Q&As
 */
export const LabManualSection = () => {
  const [expandedViva, setExpandedViva] = useState(1);

  const toggleViva = (id) => {
    setExpandedViva(expandedViva === id ? null : id);
  };

  return (
    <div className="lab-manual-container animate-fade-in">
      {/* Header Banner */}
      <div className="manual-banner">
        <Badge variant="primary" size="md" pill>
          Curriculum Lab Manual
        </Badge>
        <h2 className="manual-title">Practical 03: React Forms & Validation</h2>
        <p className="manual-subtitle">
          Laboratory manual for Controlled Components, SyntheticEvent form interception, client-side regex validation, and state immutability in Student Records Management.
        </p>
      </div>

      {/* Practical Details Grid */}
      <div className="manual-details-grid">
        <Card variant="glass" padding="md">
          <div className="manual-card-header">
            <BookOpen size={18} />
            <h3>Aim & Objectives</h3>
          </div>
          <p className="manual-text">
            <strong>Aim:</strong> To design and implement a comprehensive <strong>Student Management System</strong> in React using <strong>Controlled Components</strong>, multi-field state management, real-time client-side validation, and CRUD operations.
          </p>
          <ul className="manual-list">
            <li><CheckCircle size={14} /> Connect input elements directly to React state using <code>value</code> and <code>onChange</code>.</li>
            <li><CheckCircle size={14} /> Validate multi-field inputs (Email, Phone, Roll No format, CGPA range).</li>
            <li><CheckCircle size={14} /> Track <code>touched</code> field state to provide elegant real-time error hints.</li>
            <li><CheckCircle size={14} /> Perform full CRUD operations on student records with state immutability.</li>
          </ul>
        </Card>

        <Card variant="glass" padding="md">
          <div className="manual-card-header">
            <ShieldCheck size={18} />
            <h3>Validation Regex Specifications</h3>
          </div>
          <table className="manual-table">
            <tbody>
              <tr>
                <td><strong>Roll No:</strong></td>
                <td><code>/^STU-\d&#123;4&#125;$/</code> (e.g. STU-1001)</td>
              </tr>
              <tr>
                <td><strong>Full Name:</strong></td>
                <td><code>/^[A-Za-z\s]&#123;3,50&#125;$/</code> (3-50 chars)</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>RFC Email Regex standard</td>
              </tr>
              <tr>
                <td><strong>Phone:</strong></td>
                <td><code>/^[6-9]\d&#123;9&#125;$/</code> (10 digits)</td>
              </tr>
              <tr>
                <td><strong>CGPA:</strong></td>
                <td>Float between 0.00 and 10.00</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      {/* Controlled vs Uncontrolled Comparison Table */}
      <div className="manual-section-block">
        <div className="section-heading-row">
          <FileCode size={20} />
          <h3>Controlled vs Uncontrolled Components</h3>
        </div>
        <div className="table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Criteria</th>
                <th>Controlled Component (React Standard)</th>
                <th>Uncontrolled Component</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Data Storage</strong></td>
                <td>React component state (<code>useState</code>)</td>
                <td>DOM itself (accessed via <code>useRef()</code>)</td>
              </tr>
              <tr>
                <td><strong>Source of Truth</strong></td>
                <td>React state is the single source of truth</td>
                <td>DOM elements hold the current values</td>
              </tr>
              <tr>
                <td><strong>Real-Time Validation</strong></td>
                <td>Instant feedback on every keystroke via <code>onChange</code></td>
                <td>Requires manual querying of DOM on form submission</td>
              </tr>
              <tr>
                <td><strong>Conditional Disabling</strong></td>
                <td>Effortless (<code>disabled=&#123;!isFormValid&#125;</code>)</td>
                <td>Complex; requires DOM manipulation</td>
              </tr>
              <tr>
                <td><strong>Best For</strong></td>
                <td>Dynamic web forms, instant formatting, wizard steps</td>
                <td>File inputs (<code>&lt;input type="file"&gt;</code>) or legacy libraries</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Algorithm & Execution Steps */}
      <div className="manual-section-block">
        <div className="section-heading-row">
          <CheckCircle size={20} />
          <h3>Algorithm / Procedure</h3>
        </div>
        <ol className="procedure-list">
          <li><strong>Form State Setup:</strong> Create a multi-key state object <code>values</code> containing all student attributes (roll number, name, email, phone, department, semester, cgpa, skills).</li>
          <li><strong>Controlled Change Handling:</strong> Implement a generic <code>handleChange</code> function that extracts <code>[name]</code> and <code>value</code> or <code>checked</code> from <code>e.target</code> and updates state immutably.</li>
          <li><strong>Pure Validation Function:</strong> Construct a decoupled <code>validate(values)</code> function returning an <code>errors</code> dictionary mapping invalid fields to specific error strings.</li>
          <li><strong>Touched Field Tracking:</strong> Use <code>onBlur</code> events on input elements to flag fields as touched, ensuring error messages only show after user interaction.</li>
          <li><strong>Form Submission Interception:</strong> In <code>handleSubmit</code>, invoke <code>e.preventDefault()</code> to halt browser reload, validate all fields, and emit the validated student record to the parent list.</li>
          <li><strong>CRUD Directory Management:</strong> Allow search, department filter, in-place edit mode, immutable deletion, and client-side CSV export.</li>
        </ol>
      </div>

      {/* Viva Voce Questions Section */}
      <div className="manual-section-block">
        <div className="section-heading-row">
          <HelpCircle size={20} />
          <h3>Viva Voce Questions & Answers</h3>
        </div>
        <div className="viva-accordion-list">
          {vivaQuestionsPractical3.map((item) => (
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
