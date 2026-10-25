import React, { useState } from 'react';
import { Activity, Terminal, Trash2, Cpu, Database, Eye } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Card } from '../common/Card';
import './LiveStateInspector.css';

/**
 * LiveStateInspector Feature Component
 * Demonstrates:
 * 1. Real-time visualization of parent state tree
 * 2. SyntheticEvent stream logger demonstrating React event dispatching
 * 3. Proves state reactivity and unidirectional data flow
 */
export const LiveStateInspector = ({
  tasks,
  transactions,
  budgetLimit,
  eventLogs,
  onClearLogs
}) => {
  const [activeSubTab, setActiveSubTab] = useState('events'); // 'events' | 'stateTree'

  // Computed summary for inspector
  const stateSnapshot = {
    appState: {
      tasksModule: {
        totalTasks: tasks.length,
        completedCount: tasks.filter((t) => t.completed).length,
        pendingCount: tasks.filter((t) => !t.completed).length,
        tasksData: tasks
      },
      financialModule: {
        budgetLimit: `$${budgetLimit}`,
        transactionsCount: transactions.length,
        totalIncome: `$${transactions.filter((t) => t.type === 'income').reduce((a, b) => a + b.amount, 0)}`,
        totalExpense: `$${transactions.filter((t) => t.type === 'expense').reduce((a, b) => a + b.amount, 0)}`,
        transactionsData: transactions
      }
    }
  };

  return (
    <div className="inspector-container">
      {/* Header Banner */}
      <div className="inspector-header">
        <div className="inspector-title-col">
          <Badge variant="cyan" size="sm" dot>
            Live React DevTools Simulator
          </Badge>
          <h2 className="inspector-heading">State Reactivity & Event Stream Inspector</h2>
          <p className="inspector-desc">
            Observe the React SyntheticEvent propagation and State re-rendering pipeline in real time. Interact with tasks or expenses in other tabs to watch events fire here!
          </p>
        </div>

        <div className="inspector-actions">
          <Button
            variant="outline"
            size="sm"
            icon={<Trash2 size={14} />}
            onClick={onClearLogs}
            disabled={eventLogs.length === 0}
          >
            Clear Event Logs ({eventLogs.length})
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="inspector-subtabs">
        <button
          className={`subtab-btn ${activeSubTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('events')}
        >
          <Terminal size={15} />
          <span>SyntheticEvent Stream ({eventLogs.length})</span>
        </button>
        <button
          className={`subtab-btn ${activeSubTab === 'stateTree' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('stateTree')}
        >
          <Database size={15} />
          <span>Live State Tree (JSON)</span>
        </button>
      </div>

      {/* Tab 1: SyntheticEvent Stream */}
      {activeSubTab === 'events' && (
        <Card variant="glass" padding="none" className="event-stream-card">
          <div className="stream-header-bar">
            <span>Event Dispatch Log (React SyntheticEvent Engine)</span>
            <span className="live-indicator"><span className="pulsing-dot" /> Listening for events</span>
          </div>

          <div className="event-stream-list">
            {eventLogs.length === 0 ? (
              <div className="empty-stream">
                <Activity size={32} />
                <p>No events recorded yet. Go to the "Smart Task Board" or "Budget Ledger" tab and click, type, or submit a form to see events stream here in real time!</p>
              </div>
            ) : (
              eventLogs.map((log) => (
                <div key={log.id} className="event-log-entry animate-fade-in">
                  <div className="log-badge-col">
                    <span className={`event-type-tag tag-${log.type.split(' ')[0]}`}>
                      {log.type}
                    </span>
                  </div>
                  <div className="log-target-col">
                    <span className="target-name">Target: <code>{log.target}</code></span>
                  </div>
                  <div className="log-details-col">
                    <span className="details-text">{log.details}</span>
                  </div>
                  <div className="log-time-col">
                    <span className="timestamp">{log.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      )}

      {/* Tab 2: Live State Tree */}
      {activeSubTab === 'stateTree' && (
        <Card variant="glass" padding="none" className="state-tree-card">
          <div className="stream-header-bar">
            <span>Current React State Object (Immutable Snapshot)</span>
            <Badge variant="emerald" size="sm">Synchronized</Badge>
          </div>
          <pre className="state-json-viewer">
            <code>{JSON.stringify(stateSnapshot, null, 2)}</code>
          </pre>
        </Card>
      )}
    </div>
  );
};
