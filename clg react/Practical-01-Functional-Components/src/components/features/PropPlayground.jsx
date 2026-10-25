import React, { useState } from 'react';
import { Sliders, Sparkles, Code2, ArrowRight, ShieldCheck, Heart, Zap } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { StatCard } from '../common/StatCard';
import { Card } from '../common/Card';
import { CodeBlock } from '../common/CodeBlock';
import './PropPlayground.css';

/**
 * Feature Component: PropPlayground
 * Demonstrates:
 * 1. Deep understanding of Component Reusability
 * 2. Real-time visual manipulation of functional component props
 * 3. Dynamic JSX code generation reflecting selected props
 */
export const PropPlayground = () => {
  const [activeComponent, setActiveComponent] = useState('button');

  // Button props state
  const [btnText, setBtnText] = useState('Explore Courses');
  const [btnVariant, setBtnVariant] = useState('primary');
  const [btnSize, setBtnSize] = useState('md');
  const [btnHasIcon, setBtnHasIcon] = useState(true);
  const [btnFullWidth, setBtnFullWidth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

  // Badge props state
  const [badgeText, setBadgeText] = useState('Featured Course');
  const [badgeVariant, setBadgeVariant] = useState('cyan');
  const [badgeSize, setBadgeSize] = useState('md');
  const [badgePill, setBadgePill] = useState(true);
  const [badgeDot, setBadgeDot] = useState(true);

  // StatCard props state
  const [statTitle, setStatTitle] = useState('Active Enrollments');
  const [statValue, setStatValue] = useState('14,890');
  const [statChange, setStatChange] = useState('+18.4%');
  const [statPositive, setStatPositive] = useState(true);
  const [statAccent, setStatAccent] = useState('emerald');

  // Card props state
  const [cardVariant, setCardVariant] = useState('glass');
  const [cardPadding, setCardPadding] = useState('md');
  const [cardWithHeader, setCardWithHeader] = useState(true);
  const [cardWithFooter, setCardWithFooter] = useState(true);

  // Generate dynamic code string for each preview
  const generateCode = () => {
    switch (activeComponent) {
      case 'button':
        return `<Button
  variant="${btnVariant}"
  size="${btnSize}"${btnFullWidth ? '\n  fullWidth' : ''}${btnLoading ? '\n  loading' : ''}${btnDisabled ? '\n  disabled' : ''}${btnHasIcon ? '\n  icon={<Sparkles size={16} />}' : ''}
  onClick={() => alert('Clicked!')}
>
  ${btnText}
</Button>`;

      case 'badge':
        return `<Badge
  variant="${badgeVariant}"
  size="${badgeSize}"${badgePill ? '\n  pill' : ''}${badgeDot ? '\n  dot' : ''}
>
  ${badgeText}
</Badge>`;

      case 'statcard':
        return `<StatCard
  title="${statTitle}"
  value="${statValue}"
  change="${statChange}"
  isPositive={${statPositive}}
  accent="${statAccent}"
  icon={<Zap size={18} />}
/>`;

      case 'card':
        return `<Card
  variant="${cardVariant}"
  padding="${cardPadding}"${cardWithHeader ? '\n  header={<h3>Reusable Card Header</h3>}' : ''}${cardWithFooter ? '\n  footer={<Button size="sm">Action</Button>}' : ''}
>
  <p>This card demonstrates children prop composition.</p>
</Card>`;

      default:
        return '';
    }
  };

  return (
    <div className="playground-section">
      <div className="playground-header">
        <div className="section-tag">
          <Sliders size={16} /> Interactive Component Lab
        </div>
        <h2 className="section-title">Props & Reusability Playground</h2>
        <p className="section-subtitle">
          Experience the power of reusable functional components. Adjust the props controls below to see how a single component dynamically updates its UI and generates JSX markup!
        </p>
      </div>

      <div className="component-selector-pills">
        <button
          className={`selector-pill ${activeComponent === 'button' ? 'active' : ''}`}
          onClick={() => setActiveComponent('button')}
        >
          Button Component
        </button>
        <button
          className={`selector-pill ${activeComponent === 'badge' ? 'active' : ''}`}
          onClick={() => setActiveComponent('badge')}
        >
          Badge Component
        </button>
        <button
          className={`selector-pill ${activeComponent === 'statcard' ? 'active' : ''}`}
          onClick={() => setActiveComponent('statcard')}
        >
          StatCard Component
        </button>
        <button
          className={`selector-pill ${activeComponent === 'card' ? 'active' : ''}`}
          onClick={() => setActiveComponent('card')}
        >
          Card Component
        </button>
      </div>

      <div className="playground-grid">
        {/* Left: Controls Panel */}
        <div className="playground-controls-card">
          <h3 className="controls-heading">Configure Props</h3>

          {activeComponent === 'button' && (
            <div className="controls-form">
              <div className="control-group">
                <label className="control-label">Label Text:</label>
                <input
                  type="text"
                  className="control-input"
                  value={btnText}
                  onChange={(e) => setBtnText(e.target.value)}
                />
              </div>

              <div className="control-group">
                <label className="control-label">Variant:</label>
                <select
                  className="control-select"
                  value={btnVariant}
                  onChange={(e) => setBtnVariant(e.target.value)}
                >
                  <option value="primary">primary</option>
                  <option value="gradient">gradient</option>
                  <option value="secondary">secondary</option>
                  <option value="outline">outline</option>
                  <option value="danger">danger</option>
                  <option value="ghost">ghost</option>
                </select>
              </div>

              <div className="control-group">
                <label className="control-label">Size:</label>
                <div className="radio-pill-group">
                  {['sm', 'md', 'lg'].map((sz) => (
                    <button
                      key={sz}
                      className={`radio-pill ${btnSize === sz ? 'active' : ''}`}
                      onClick={() => setBtnSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <div className="control-checkbox-grid">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={btnHasIcon}
                    onChange={(e) => setBtnHasIcon(e.target.checked)}
                  />
                  <span>Show Icon</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={btnFullWidth}
                    onChange={(e) => setBtnFullWidth(e.target.checked)}
                  />
                  <span>Full Width</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={btnLoading}
                    onChange={(e) => setBtnLoading(e.target.checked)}
                  />
                  <span>Loading</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={btnDisabled}
                    onChange={(e) => setBtnDisabled(e.target.checked)}
                  />
                  <span>Disabled</span>
                </label>
              </div>
            </div>
          )}

          {activeComponent === 'badge' && (
            <div className="controls-form">
              <div className="control-group">
                <label className="control-label">Badge Text:</label>
                <input
                  type="text"
                  className="control-input"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                />
              </div>

              <div className="control-group">
                <label className="control-label">Color Variant:</label>
                <select
                  className="control-select"
                  value={badgeVariant}
                  onChange={(e) => setBadgeVariant(e.target.value)}
                >
                  <option value="primary">primary (Indigo)</option>
                  <option value="cyan">cyan</option>
                  <option value="emerald">emerald (Green)</option>
                  <option value="amber">amber (Gold)</option>
                  <option value="rose">rose (Red)</option>
                  <option value="purple">purple</option>
                  <option value="neutral">neutral</option>
                </select>
              </div>

              <div className="control-group">
                <label className="control-label">Size:</label>
                <div className="radio-pill-group">
                  {['sm', 'md'].map((sz) => (
                    <button
                      key={sz}
                      className={`radio-pill ${badgeSize === sz ? 'active' : ''}`}
                      onClick={() => setBadgeSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <div className="control-checkbox-grid">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={badgePill}
                    onChange={(e) => setBadgePill(e.target.checked)}
                  />
                  <span>Pill Style (Rounded)</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={badgeDot}
                    onChange={(e) => setBadgeDot(e.target.checked)}
                  />
                  <span>Status Dot</span>
                </label>
              </div>
            </div>
          )}

          {activeComponent === 'statcard' && (
            <div className="controls-form">
              <div className="control-group">
                <label className="control-label">Stat Title:</label>
                <input
                  type="text"
                  className="control-input"
                  value={statTitle}
                  onChange={(e) => setStatTitle(e.target.value)}
                />
              </div>

              <div className="control-group">
                <label className="control-label">Metric Value:</label>
                <input
                  type="text"
                  className="control-input"
                  value={statValue}
                  onChange={(e) => setStatValue(e.target.value)}
                />
              </div>

              <div className="control-group">
                <label className="control-label">Change %:</label>
                <input
                  type="text"
                  className="control-input"
                  value={statChange}
                  onChange={(e) => setStatChange(e.target.value)}
                />
              </div>

              <div className="control-group">
                <label className="control-label">Accent Theme:</label>
                <select
                  className="control-select"
                  value={statAccent}
                  onChange={(e) => setStatAccent(e.target.value)}
                >
                  <option value="indigo">Indigo Accent</option>
                  <option value="emerald">Emerald Accent</option>
                  <option value="cyan">Cyan Accent</option>
                  <option value="amber">Amber Accent</option>
                </select>
              </div>

              <div className="control-checkbox-grid">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={statPositive}
                    onChange={(e) => setStatPositive(e.target.checked)}
                  />
                  <span>Positive Trend (+Up)</span>
                </label>
              </div>
            </div>
          )}

          {activeComponent === 'card' && (
            <div className="controls-form">
              <div className="control-group">
                <label className="control-label">Card Variant:</label>
                <select
                  className="control-select"
                  value={cardVariant}
                  onChange={(e) => setCardVariant(e.target.value)}
                >
                  <option value="glass">glass (Glassmorphic)</option>
                  <option value="interactive">interactive (Hover glow)</option>
                  <option value="solid">solid</option>
                  <option value="bordered">bordered</option>
                </select>
              </div>

              <div className="control-group">
                <label className="control-label">Padding:</label>
                <div className="radio-pill-group">
                  {['sm', 'md', 'lg'].map((pd) => (
                    <button
                      key={pd}
                      className={`radio-pill ${cardPadding === pd ? 'active' : ''}`}
                      onClick={() => setCardPadding(pd)}
                    >
                      {pd}
                    </button>
                  ))}
                </div>
              </div>

              <div className="control-checkbox-grid">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={cardWithHeader}
                    onChange={(e) => setCardWithHeader(e.target.checked)}
                  />
                  <span>Include Header Slot</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={cardWithFooter}
                    onChange={(e) => setCardWithFooter(e.target.checked)}
                  />
                  <span>Include Footer Slot</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Right: Live Preview & Generated Code */}
        <div className="playground-preview-container">
          <div className="preview-stage-card">
            <div className="stage-header">
              <span className="stage-title">Live Render Preview</span>
              <Badge variant="emerald" size="sm" dot>
                Interactive
              </Badge>
            </div>

            <div className="stage-render-area">
              {activeComponent === 'button' && (
                <div className="render-box">
                  <Button
                    variant={btnVariant}
                    size={btnSize}
                    icon={btnHasIcon ? <Sparkles size={16} /> : null}
                    fullWidth={btnFullWidth}
                    loading={btnLoading}
                    disabled={btnDisabled}
                    onClick={() => alert(`Button clicked with variant "${btnVariant}"`)}
                  >
                    {btnText}
                  </Button>
                </div>
              )}

              {activeComponent === 'badge' && (
                <div className="render-box">
                  <Badge
                    variant={badgeVariant}
                    size={badgeSize}
                    pill={badgePill}
                    dot={badgeDot}
                  >
                    {badgeText}
                  </Badge>
                </div>
              )}

              {activeComponent === 'statcard' && (
                <div className="render-box statcard-render-wrapper">
                  <StatCard
                    title={statTitle}
                    value={statValue}
                    change={statChange}
                    isPositive={statPositive}
                    accent={statAccent}
                    icon={<Zap size={18} />}
                  />
                </div>
              )}

              {activeComponent === 'card' && (
                <div className="render-box card-render-wrapper">
                  <Card
                    variant={cardVariant}
                    padding={cardPadding}
                    header={
                      cardWithHeader ? (
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                          <strong>Composable Card Header</strong>
                          <Badge variant="purple" size="sm">Slot Prop</Badge>
                        </div>
                      ) : null
                    }
                    footer={
                      cardWithFooter ? (
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', width: '100%' }}>
                          <Button variant="ghost" size="sm">Dismiss</Button>
                          <Button variant="primary" size="sm">Confirm</Button>
                        </div>
                      ) : null
                    }
                  >
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      This card demonstrates the <code>props.children</code> pattern. Any nested markup or functional components can be composed within.
                    </p>
                  </Card>
                </div>
              )}
            </div>
          </div>

          {/* Generated JSX Block */}
          <div className="generated-code-section">
            <CodeBlock
              filename="Generated JSX Markup"
              language="jsx"
              code={generateCode()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
