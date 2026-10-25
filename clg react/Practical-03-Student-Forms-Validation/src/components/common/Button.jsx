import React from 'react';
import './Button.css';

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

  return (
    <button
      type={type}
      className={classes}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...rest}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
