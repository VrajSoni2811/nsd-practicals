import React, { useState } from 'react';
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';
import './AlertBanner.css';

/**
 * Reusable Functional Component: AlertBanner
 * Demonstrates:
 * 1. Icon mapping based on alert variant prop
 * 2. Conditional rendering of close button
 * 3. Functional event handler logic
 */
export const AlertBanner = ({
  type = 'info', // 'info' | 'success' | 'warning' | 'danger'
  title = '',
  message,
  dismissible = true,
  onClose = null,
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleDismiss = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  const icons = {
    info: <Info size={18} />,
    success: <CheckCircle2 size={18} />,
    warning: <AlertTriangle size={18} />,
    danger: <XCircle size={18} />
  };

  return (
    <div className={`alert-banner alert-${type}`}>
      <div className="alert-icon-wrapper">{icons[type] || icons.info}</div>
      <div className="alert-content">
        {title && <h4 className="alert-title">{title}</h4>}
        <p className="alert-message">{message}</p>
      </div>
      {dismissible && (
        <button
          className="alert-close-btn"
          onClick={handleDismiss}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
