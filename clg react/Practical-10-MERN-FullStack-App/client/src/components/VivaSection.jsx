import React from 'react';

export default function VivaSection() {
  const vivaItems = [
    {
      q: 'Q1: What does the MERN stack stand for and how do its four components interact?',
      a: 'MERN stands for MongoDB (NoSQL Document Database), Express.js (Backend Web Framework), React (Frontend Single Page Application Library), and Node.js (JavaScript Runtime). The user interacts with React in the browser, which makes asynchronous HTTP/REST calls (using fetch/axios) to the Express server running on Node.js. Express handles routing, business logic, and validation, then queries MongoDB via Mongoose before returning JSON responses to React for declarative DOM rendering.'
    },
    {
      q: 'Q2: How does Cross-Origin Resource Sharing (CORS) affect full-stack MERN development?',
      a: 'Browsers enforce the Same-Origin Policy (SOP) which blocks web pages on one origin (e.g., http://localhost:5177) from reading HTTP responses from another origin (e.g., http://localhost:5005). To permit client-server communication, the Express backend must configure CORS headers (via the cors npm package) or the Vite development server must configure a reverse proxy in vite.config.js.'
    },
    {
      q: 'Q3: What are Controlled Components in React and how are they used in this MERN app?',
      a: 'A controlled component is an input element whose value is tied to React state and updated via an onChange handler. In our ProjectFormModal, each input (title, category, budget, status) is bound to the formData state object. This ensures real-time input validation, formatted previews, and prevents the DOM and React state from falling out of sync.'
    },
    {
      q: 'Q4: What is the role of the useEffect hook in consuming backend REST APIs?',
      a: 'The useEffect hook synchronizes a React component with an external system (in this case, our Express backend). By providing an empty dependency array [], useEffect executes once immediately after the initial mount, dispatching a GET request to fetch projects and populate the component state.'
    },
    {
      q: 'Q5: How does Mongoose Schema Validation guarantee data integrity in a MERN stack?',
      a: 'Although MongoDB is naturally schema-less, Mongoose enforces structure by running validation rules (required, min, max, enum, match) before executing any insert or update operation. If invalid data is submitted, Mongoose rejects the write and generates a ValidationError with field-specific messages.'
    },
    {
      q: 'Q6: What is Optimistic UI Updating in full-stack applications?',
      a: 'Optimistic UI is a frontend performance pattern where the client interface immediately updates its state (e.g., changing a project status from In-Progress to Completed) before waiting for the server to respond over the network. If the backend fails or rejects the request, the client rolls back the state to the previous snapshot and displays an error alert.'
    },
    {
      q: 'Q7: Why are Environment Variables (.env) used in both React and Node.js?',
      a: 'Environment variables keep sensitive secrets (database passwords, API credentials, secret signing keys) and environment-dependent configs (port numbers, backend base URLs) separate from the version-controlled codebase. In Express, dotenv loads variables into process.env, while in Vite React, variables prefixed with VITE_ are exposed via import.meta.env.'
    },
    {
      q: 'Q8: Compare client-side rendering (CSR) in React with traditional server-side rendering (SSR).',
      a: 'In CSR (React SPA), the server delivers a minimal HTML shell and a large JavaScript bundle; the client browser builds and updates the DOM dynamically without reloading the entire page. In SSR (traditional PHP/JSP or Next.js), the server renders full HTML on every request. CSR provides ultra-smooth, app-like transitions and decreases server workload once loaded.'
    }
  ];

  return (
    <section id="viva-section" className="viva-container glass-panel">
      <div className="viva-header">
        <span className="badge">Academic Viva Reference</span>
        <h2>Practical 10: Viva Voce & Full-Stack MERN Architecture</h2>
        <p>Comprehensive Q&A covering Full-Stack MERN Data Flow, CORS, REST Integration, and Mongoose Modeling.</p>
      </div>

      <div className="accordion-list">
        {vivaItems.map((item, idx) => (
          <details key={idx} className="accordion-item" open={idx === 0}>
            <summary>{item.q}</summary>
            <div className="accordion-content">
              <p>{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
