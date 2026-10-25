import React from 'react';
import './Button.css';

/**
 * Reusable Button demonstrating Props passing & Event Handling
 * Props:
 * - onClick: Event handler function passed from parent
 * - variant: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost'
 * - size: 'sm' | 'md' | 'lg'
 */
export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  type = 'button',
  icon = null,
  disabled = false,
  className = '',
  ...rest
}) => {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      className={classes}
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
