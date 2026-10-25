import React from 'react';
import './Card.css';

/**
 * Reusable Functional Component: Card
 * Demonstrates:
 * 1. Children composition pattern (props.children)
 * 2. Slot pattern with header and footer props
 * 3. Conditional rendering of card sub-sections
 * 4. Flexible styling variants
 */
export const Card = ({
  children,
  header = null,
  footer = null,
  variant = 'glass', // 'glass' | 'solid' | 'interactive' | 'bordered'
  padding = 'md',    // 'none' | 'sm' | 'md' | 'lg'
  className = '',
  onClick,
  ...rest
}) => {
  const classes = [
    'card',
    `card-${variant}`,
    `card-p-${padding}`,
    onClick ? 'card-clickable' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} onClick={onClick} {...rest}>
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};
