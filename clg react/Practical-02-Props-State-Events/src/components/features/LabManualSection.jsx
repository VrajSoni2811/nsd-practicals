import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  FileCode,
  Layers,
  HelpCircle,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { vivaQuestionsPractical2 } from '../../data/initialData';
import { Badge } from '../common/Badge';
import { Card } from '../common/Card';
import './LabManualSection.css';

/**
 * LabManualSection Component for Practical 02
 * Demonstrates:
 * 1. Comprehensive Academic Theory on Props, State, and Event Handling
 * 2. Accordion interaction state
 * 3. Structured comparison tables and procedure
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
        <h2 className="manual-title">Practical 02: Props, State & Event Handling</h2>
        <p className="manual-subtitle">
          University laboratory guide covering unidirectional data flow, mutable component state (`useState`), SyntheticEvent handling, and state lifting paradigms.
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
            <strong>Aim:</strong> To develop a modern React application implementing <strong>Props</strong> for parent-to-child communication, <strong>State Management</strong> using the <code>useState</code> hook with immutability, and <strong>Event Handling</strong> via React's SyntheticEvent system.
          </p>
          <ul className="manual-list">
            <li><CheckCircle size={14} /> Master props passing, prop drilling vs lifting state up.</li>
            <li><CheckCircle size={14} /> Apply primitive, array, and object state with pure immutability.</li>
            <li><CheckCircle size={14} /> Handle synthetic events: <code>onSubmit</code>, <code>onChange</code>, <code>onClick</code>, <code>e.stopPropagation()</code>.</li>
            <li><CheckCircle size={14} /> Use functional state updaters: <code>setState(prev =&gt; prev + 1)</code>.</li>
          </ul>
        </Card>

        <Card variant="glass" padding="md">
          <div className="manual-card-header">
            <Layers size={18} />
            <h3>Key Concepts Matrix</h3>
          </div>
          <table className="manual-table">
            <tbody>
              <tr>
                <td><strong>Data Flow:</strong></td>
                <td>Unidirectional (Parent &rarr; Child via Props)</td>
              </tr>
              <tr>
                <td><strong>State Hook:</strong></td>
                <td><code>useState</code> (Primitive, Array, Object)</td>
              </tr>
              <tr>
                <td><strong>Event System:</strong></td>
                <td>SyntheticEvent (Cross-browser event delegation)</td>
              </tr>
              <tr>
                <td><strong>Immutability:</strong></td>
                <td>Spread operator <code>[...prev]</code>, <code>.map()</code>, <code>.filter()</code></td>
              </tr>
              <tr>
                <td><strong>Propagation:</strong></td>
                <td><code>e.preventDefault()</code> &amp; <code>e.stopPropagation()</code></td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      {/* Props vs State Comparison Table */}
      <div className="manual-section-block">
        <div className="section-heading-row">
          <FileCode size={20} />
          <h3>Props vs State: In-Depth Comparison</h3>
        </div>
        <div className="table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Criteria</th>
                <th>Props (Properties)</th>
                <th>State (Component State)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Definition</strong></td>
                <td>Read-only configuration data passed from parent to child</td>
                <td>Internal, mutable data owned and managed by the component itself</td>
              </tr>
              <tr>
                <td><strong>Mutability</strong></td>
                <td><strong>Immutable</strong> (child cannot modify its received props)</td>
                <td><strong>Mutable</strong> via its dedicated setter function (<code>setState</code>)</td>
              </tr>
              <tr>
                <td><strong>Creation / Ownership</strong></td>
                <td>Passed into the component as JSX attributes</td>
                <td>Initialized internally via <code>useState(initialValue)</code></td>
              </tr>
              <tr>
                <td><strong>Re-rendering</strong></td>
                <td>Triggered when the parent passes new props values</td>
                <td>Triggered when the setter function is called with a new reference</td>
              </tr>
              <tr>
                <td><strong>Communication</strong></td>
                <td>Top-down (Parent &rarr; Child)</td>
                <td>Lifting state up: Child notifies parent via callback props</td>
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
          <li><strong>Workspace Setup:</strong> Create a dedicated folder <code>Practical-02-Props-State-Events</code> using Vite and install required icon/UI packages.</li>
          <li><strong>State Initialization:</strong> In parent components, initialize state variables:
            <ul>
              <li>Array State: <code>const [tasks, setTasks] = useState(initialTasks)</code></li>
              <li>Form Object State: <code>{"const [formData, setFormData] = useState({ ... })"}</code></li>
              <li>Numerical State: <code>const [budgetLimit, setBudgetLimit] = useState(3000)</code></li>
            </ul>
          </li>
          <li><strong>Controlled Form Handling:</strong> Bind input <code>value</code> to state and capture user keystrokes through <code>onChange</code> handlers. Intercept form submission using <code>onSubmit</code> with <code>e.preventDefault()</code> to prevent page reloads.</li>
          <li><strong>Lifting State Up:</strong> Pass callback functions down as props from parent to child components (e.g. <code>onToggle(id)</code>, <code>onDelete(id)</code>), allowing children to request state modifications in the parent.</li>
          <li><strong>Preventing Event Bubbling:</strong> Apply <code>e.stopPropagation()</code> inside nested buttons (such as delete buttons inside a clickable task row) to prevent unwanted trigger of parent click events.</li>
          <li><strong>Live Event & State Monitoring:</strong> Implement an inspector showing real-time SyntheticEvent dispatching and the immutable JSON state tree.</li>
        </ol>
      </div>

      {/* Viva Voce Questions Section */}
      <div className="manual-section-block">
        <div className="section-heading-row">
          <HelpCircle size={20} />
          <h3>Viva Voce Questions & Answers</h3>
        </div>
        <div className="viva-accordion-list">
          {vivaQuestionsPractical2.map((item) => (
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
