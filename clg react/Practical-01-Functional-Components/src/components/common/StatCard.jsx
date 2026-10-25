import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import './StatCard.css';

/**
 * Reusable Functional Component: StatCard
 * Demonstrates:
 * 1. Passing icons as props (Component composition)
 * 2. Conditional rendering of positive vs negative trends
 * 3. Dynamic color theming through prop tokens
 */
export const StatCard = ({
  title,
  value,
  change = null,
  isPositive = true,
  icon = null,
  accent = 'indigo', // 'indigo' | 'cyan' | 'emerald' | 'amber'
  subtitle = 'vs last semester'
}) => {
  return (
    <div className={`stat-card stat-accent-${accent}`}>
      <div className="stat-card-top">
        <span className="stat-card-title">{title}</span>
        {icon && <div className="stat-card-icon">{icon}</div>}
      </div>
      
      <div className="stat-card-value">{value}</div>

      {change && (
        <div className="stat-card-bottom">
          <span className={`stat-trend ${isPositive ? 'trend-up' : 'trend-down'}`}>
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {change}
          </span>
          <span className="stat-subtitle">{subtitle}</span>
        </div>
      )}
    </div>
  );
};
