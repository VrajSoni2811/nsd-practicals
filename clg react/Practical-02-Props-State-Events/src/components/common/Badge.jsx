import React from 'react';
import './Badge.css';

/**
 * Reusable Badge demonstrating Props Passing
 * Props:
 * - variant: 'primary' | 'emerald' | 'rose' | 'amber' | 'cyan' | 'purple' | 'neutral'
 * - pill: boolean
 * - dot: boolean
 */
export const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  pill = false,
  dot = false,
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
      <span className="badge-text">{children}</span>
    </span>
  );
};
