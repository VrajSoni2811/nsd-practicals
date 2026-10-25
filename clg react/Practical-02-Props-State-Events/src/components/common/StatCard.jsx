import React from 'react';
import './StatCard.css';

/**
 * Reusable StatCard demonstrating props mapping & conditional classes
 */
export const StatCard = ({
  title,
  value,
  subtitle = '',
  icon = null,
  accent = 'indigo', // 'indigo' | 'emerald' | 'rose' | 'amber'
  action = null
}) => {
  return (
    <div className={`stat-card stat-accent-${accent}`}>
      <div className="stat-card-header">
        <span className="stat-title">{title}</span>
        {icon && <div className="stat-icon-wrapper">{icon}</div>}
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-footer-row">
        {subtitle && <span className="stat-subtitle">{subtitle}</span>}
        {action && <div className="stat-action-slot">{action}</div>}
      </div>
    </div>
  );
};
