import React from 'react';
import './Badge.css';

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
