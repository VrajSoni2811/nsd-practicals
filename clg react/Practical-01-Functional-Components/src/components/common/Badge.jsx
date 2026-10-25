import React from 'react';
import './Badge.css';

/**
 * Reusable Functional Component: Badge
 * Demonstrates:
 * 1. Clean presentation-only functional component
 * 2. Visual variants (colors, pill shape, dot indicator)
 * 3. Conditional JSX rendering
 */
export const Badge = ({
  children,
  variant = 'primary', // 'primary' | 'cyan' | 'emerald' | 'amber' | 'rose' | 'purple' | 'neutral'
  size = 'md',         // 'sm' | 'md'
  pill = false,
  dot = false,
  icon = null,
  className = '',
}) => {
  const classes = [
    'badge',
    `badge-${variant}`,
    `badge-${size}`,
    pill ? 'badge-pill' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classes}>
      {dot && <span className="badge-dot" />}
      {icon && <span className="badge-icon">{icon}</span>}
      <span className="badge-text">{children}</span>
    </span>
  );
};
