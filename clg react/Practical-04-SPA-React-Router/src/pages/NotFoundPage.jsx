import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import './NotFoundPage.css';

export const NotFoundPage = () => {
  return (
    <div className="not-found-page animate-fade-in">
      <div className="not-found-card">
        <span className="error-code-badge">404 Error</span>
        <h1 className="not-found-title">Page Route Not Found</h1>
        <p className="not-found-sub">
          The requested URL path does not match any registered route in our <code>&lt;Routes&gt;</code> hierarchy.
        </p>
        <Link to="/" className="home-redirect-btn">
          <Home size={16} /> Return to Campus Dashboard
        </Link>
      </div>
    </div>
  );
};
