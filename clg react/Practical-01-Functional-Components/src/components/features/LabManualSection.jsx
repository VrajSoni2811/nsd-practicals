import React, { useState } from 'react';
import { BookOpen, CheckCircle, ChevronDown, ChevronUp, FileCode, Layers, HelpCircle, Lightbulb } from 'lucide-react';
import { vivaQuestions } from '../../data/vivaQuestions';
import { Badge } from '../common/Badge';
import { Card } from '../common/Card';
import { CodeBlock } from '../common/CodeBlock';
import './LabManualSection.css';

/**
 * Feature Component: LabManualSection
 * Demonstrates:
 * 1. Comprehensive Academic Theory & Practical Lab Documentation
 * 2. Accordion interaction for Viva Questions (State & event handling)
 * 3. Structured JSX tables and code comparisons
 */
export const LabManualSection = () => {
  const [expandedViva, setExpandedViva] = useState(1);

  const toggleViva = (id) => {
    setExpandedViva(expandedViva === id ? null : id);
  };

  const sampleFunctionalComponentCode = `// 1. Defining a Reusable Functional Component with Destructured Props
import React from 'react';

export const MetricBadge = ({ label, count, color = 'emerald' }) => {
  // JSX Return statement
  return (
    <div className={\`badge-container badge-\${color}\`}>
      <span className="badge-dot" />
      <span className="badge-label">{label}</span>
      <span className="badge-count">({count})</span>
    </div>
  );
};

// 2. Reusing the Component across multiple places with different props
export const Dashboard = () => {
  return (
    <section>
      <MetricBadge label="Passed" count={120} color="emerald" />
      <MetricBadge label="Pending" count={14} color="amber" />
      <MetricBadge label="Failed" count={3} color="rose" />
    </section>
  );
};`;

  return (
    <div className="lab-manual-container animate-fade-in">
      {/* Header Banner */}
      <div className="manual-banner">
        <Badge variant="primary" size="md" pill>
          Curriculum Lab Manual
        </Badge>
        <h2 className="manual-title">Practical 01: Lab Manual & Theory Guide</h2>
        <p className="manual-subtitle">
          Official practical documentation for Functional Components, JSX syntax specifications, Component Reusability paradigms, and university viva preparations.
        </p>
      </div>

      {/* Practical Details Grid */}
      <div className="manual-details-grid">
        <Card variant="glass" padding="md">
          <div className="manual-card-header">
            <BookOpen size={18} className="manual-header-icon" />
            <h3>Aim & Objective</h3>
          </div>
          <p className="manual-text">
            <strong>Aim:</strong> To build a modern React application utilizing <strong>Functional Components</strong>, understand and apply <strong>JSX (JavaScript XML)</strong> syntax rules, and establish modular <strong>Component Reusability</strong> through props and children composition.
          </p>
          <ul className="manual-list">
            <li><CheckCircle size={14} /> Understand pure JavaScript functions as React components.</li>
            <li><CheckCircle size={14} /> Master JSX expressions, conditional rendering, and fragment usage.</li>
            <li><CheckCircle size={14} /> Design decoupled, reusable atomic components (Buttons, Badges, Cards).</li>
          </ul>
        </Card>

        <Card variant="glass" padding="md">
          <div className="manual-card-header">
            <Layers size={18} className="manual-header-icon" />
            <h3>Software Requirements</h3>
          </div>
          <table className="manual-table">
            <tbody>
              <tr>
                <td><strong>Framework:</strong></td>
                <td>React 19.x (Functional Components)</td>
              </tr>
              <tr>
                <td><strong>Bundler:</strong></td>
                <td>Vite 8.x</td>
              </tr>
              <tr>
                <td><strong>Language:</strong></td>
                <td>JavaScript (ES6+ / JSX)</td>
              </tr>
              <tr>
                <td><strong>Styling:</strong></td>
                <td>Vanilla CSS (Custom Design System Tokens)</td>
              </tr>
              <tr>
                <td><strong>Node Version:</strong></td>
                <td>Node.js v18.x or v20.x+</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      {/* Comparison: Functional vs Class Components */}
      <div className="manual-section-block">
        <div className="section-heading-row">
          <FileCode size={20} className="section-icon" />
          <h3>Functional Components vs Class Components</h3>
        </div>
        <div className="table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Functional Component (Modern Standard)</th>
                <th>Class Component (Legacy)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Syntax</strong></td>
                <td>Plain JavaScript function returning JSX</td>
                <td>ES6 class extending <code>React.Component</code> with a <code>render()</code> method</td>
              </tr>
              <tr>
                <td><strong>'this' Keyword</strong></td>
                <td>No 'this' binding required (eliminates subtle bugs)</td>
                <td>Requires manual binding in constructor or arrow methods</td>
              </tr>
              <tr>
                <td><strong>State & Lifecycle</strong></td>
                <td>Managed via React Hooks (<code>useState</code>, <code>useEffect</code>)</td>
                <td>Managed via <code>this.state</code> and lifecycle methods (<code>componentDidMount</code>)</td>
              </tr>
              <tr>
                <td><strong>Performance</strong></td>
                <td>Lightweight, smaller bundle size, faster garbage collection</td>
                <td>Higher memory overhead due to class instance creation</td>
              </tr>
              <tr>
                <td><strong>Reusability</strong></td>
                <td>High; easy to compose, test, and pass down via props</td>
                <td>Often requires higher-order components (HOCs) or render props</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Code Architecture Demonstration */}
      <div className="manual-section-block">
        <div className="section-heading-row">
          <Lightbulb size={20} className="section-icon" />
          <h3>Component Reusability Architecture</h3>
        </div>
        <p className="manual-text">
          In this practical, the application is organized using atomic component architecture. Notice how the same <code>Badge</code> and <code>Button</code> functional components are reused across <code>CourseCard</code>, <code>InstructorCard</code>, and the <code>PropPlayground</code>:
        </p>
        <CodeBlock
          filename="ComponentReusabilityPattern.jsx"
          language="jsx"
          code={sampleFunctionalComponentCode}
        />
      </div>

      {/* Algorithm & Execution Steps */}
      <div className="manual-section-block">
        <div className="section-heading-row">
          <CheckCircle size={20} className="section-icon" />
          <h3>Algorithm / Procedure</h3>
        </div>
        <ol className="procedure-list">
          <li><strong>Project Initialization:</strong> Initialize a fast, modular React application using Vite <code>npm create vite@latest Practical-01-Functional-Components -- --template react</code>.</li>
          <li><strong>Establish CSS Design Tokens:</strong> Define consistent variables for colors, typography, glassmorphism, and shadows in <code>index.css</code>.</li>
          <li><strong>Construct Common Atomic Components:</strong>
            <ul>
              <li>Create <code>Button.jsx</code> with variants (primary, secondary, gradient, outline) and size props.</li>
              <li>Create <code>Badge.jsx</code> with color variants, pill shapes, and dot indicators.</li>
              <li>Create <code>Card.jsx</code> using the children composition pattern (<code>props.children</code>) and slot props (<code>header</code>, <code>footer</code>).</li>
              <li>Create <code>StatCard.jsx</code> for displaying analytics metrics with dynamic trend colors.</li>
            </ul>
          </li>
          <li><strong>Assemble Feature Components:</strong>
            <ul>
              <li>Create <code>CourseCard.jsx</code> by nesting the reusable <code>Card</code>, <code>Badge</code>, and <code>Button</code>.</li>
              <li>Create <code>InstructorCard.jsx</code> showing faculty details using the same common primitives.</li>
            </ul>
          </li>
          <li><strong>Implement Real-time Prop Playground:</strong> Allow dynamic changing of props (variant, size, text, icons) to observe visual adaptation and view auto-generated JSX.</li>
          <li><strong>Verification & Testing:</strong> Verify responsive rendering across mobile, tablet, and desktop viewports with zero errors.</li>
        </ol>
      </div>

      {/* Viva Voce Questions Section */}
      <div className="manual-section-block">
        <div className="section-heading-row">
          <HelpCircle size={20} className="section-icon" />
          <h3>Viva Voce Questions & Answers</h3>
        </div>
        <div className="viva-accordion-list">
          {vivaQuestions.map((item) => (
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
