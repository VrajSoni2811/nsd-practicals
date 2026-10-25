import React from 'react';
import './Card.css';

export const Card = ({
  children,
  header = null,
  footer = null,
  className = '',
  padding = 'md',
  onClick = null,
}) => {
  return (
    <div
      className={`card card-p-${padding} ${onClick ? 'card-clickable' : ''} ${className}`}
      onClick={onClick}
    >
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};
