import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Wallet,
  Activity,
  BookOpen,
  Sun,
  Moon,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { TaskBoard } from './components/features/TaskBoard';
import { BudgetTracker } from './components/features/BudgetTracker';
import { LiveStateInspector } from './components/features/LiveStateInspector';
import { LabManualSection } from './components/features/LabManualSection';
import { Badge } from './components/common/Badge';
import { Button } from './components/common/Button';
import { StatCard } from './components/common/StatCard';
import { StudentLabHeader } from './components/common/StudentLabHeader';
import { initialTasks, initialTransactions } from './data/initialData';
import './App.css';

export function App() {
  // Navigation & Theme state (Primitive state)
  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks' | 'budget' | 'inspector' | 'manual'
  const [theme, setTheme] = useState('dark');

  // Shared Application State (Lifting State Up)
  const [tasks, setTasks] = useState(initialTasks);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [budgetLimit, setBudgetLimit] = useState(3500);

  // SyntheticEvent Stream Log State
  const [eventLogs, setEventLogs] = useState([
    {
      id: 1,
      type: 'onMount',
      target: 'AppRoot',
      details: 'Application mounted. State initialized with initial data.',
      time: new Date().toLocaleTimeString()
    }
  ]);

  // Sync theme attribute to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    logSyntheticEvent({
      type: 'onClick',
      target: 'ThemeToggleButton',
      details: `Switched theme state to "${nextTheme}"`
    });
  };

  // Event logger function passed down via props (Lifting state up)
  const logSyntheticEvent = ({ type, target, details }) => {
    const newLog = {
      id: Date.now() + Math.random(),
      type,
      target,
      details,
      time: new Date().toLocaleTimeString()
    };
    setEventLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  };

  const handleClearLogs = () => {
    setEventLogs([]);
  };

  // Computed overview metrics
  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const pendingTasksCount = tasks.filter((t) => !t.completed).length;
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((a, b) => a + b.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((a, b) => a + b.amount, 0);
  const netBalance = totalIncome - totalExpense;

  return (
    <div className="app-layout">
      {/* Top Navbar */}
      <header className="top-navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="brand-icon-box">
              <Layers size={22} className="brand-icon" />
            </div>
            <div className="brand-text">
              <div className="brand-row">
                <span className="brand-title">StateFlow & Ledger</span>
                <Badge variant="primary" size="sm" pill>
                  Practical 02
                </Badge>
              </div>
              <span className="brand-subtitle">
                Props, State Management & Event Handling
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="nav-tabs" aria-label="Main Navigation">
            <button
              className={`nav-tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('tasks');
                logSyntheticEvent({ type: 'onClick', target: 'NavTab', details: 'Switched to Tasks tab' });
              }}
            >
              <CheckSquare size={16} />
              <span>Smart Tasks ({pendingTasksCount})</span>
            </button>
            <button
              className={`nav-tab-btn ${activeTab === 'budget' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('budget');
                logSyntheticEvent({ type: 'onClick', target: 'NavTab', details: 'Switched to Budget tab' });
              }}
            >
              <Wallet size={16} />
              <span>Budget Ledger</span>
            </button>
            <button
              className={`nav-tab-btn ${activeTab === 'inspector' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('inspector');
                logSyntheticEvent({ type: 'onClick', target: 'NavTab', details: 'Opened State & Event Inspector' });
              }}
            >
              <Activity size={16} />
              <span>Event & State Inspector</span>
              {eventLogs.length > 0 && (
                <span className="badge-count-pill">{eventLogs.length}</span>
              )}
            </button>
            <button
              className={`nav-tab-btn ${activeTab === 'manual' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('manual');
                logSyntheticEvent({ type: 'onClick', target: 'NavTab', details: 'Opened Lab Manual & Viva guide' });
              }}
            >
              <BookOpen size={16} />
              <span>Lab Manual & Viva</span>
            </button>
          </nav>

          {/* Header Action */}
          <div className="nav-actions">
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title="Toggle dark/light theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="main-content">
        <div className="content-container">
          {/* 1st Semester Student Lab Record Header */}
          <StudentLabHeader
            practicalNo="02"
            aim="Develop a React application implementing Props, State Management and Event Handling."
          />

          {/* Quick Metrics Strip */}
          <div className="top-metrics-strip">
            <StatCard
              title="Pending Tasks"
              value={pendingTasksCount}
              subtitle={`${completedTasksCount} completed`}
              accent="indigo"
              icon={<CheckSquare size={18} />}
            />
            <StatCard
              title="Net Balance"
              value={`$${netBalance.toLocaleString()}`}
              subtitle={`${transactions.length} transactions`}
              accent={netBalance >= 0 ? 'emerald' : 'rose'}
              icon={<Wallet size={18} />}
            />
            <StatCard
              title="Budget Cap"
              value={`$${budgetLimit.toLocaleString()}`}
              subtitle="Functional state updater"
              accent="amber"
              icon={<Sparkles size={18} />}
            />
            <StatCard
              title="Events Dispatched"
              value={eventLogs.length}
              subtitle="SyntheticEvent stream"
              accent="cyan"
              icon={<Activity size={18} />}
            />
          </div>

          {/* TAB 1: SMART TASKS */}
          {activeTab === 'tasks' && (
            <div className="tab-pane animate-fade-in">
              <TaskBoard
                tasks={tasks}
                setTasks={setTasks}
                onLogEvent={logSyntheticEvent}
              />
            </div>
          )}

          {/* TAB 2: BUDGET LEDGER */}
          {activeTab === 'budget' && (
            <div className="tab-pane animate-fade-in">
              <BudgetTracker
                transactions={transactions}
                setTransactions={setTransactions}
                budgetLimit={budgetLimit}
                setBudgetLimit={setBudgetLimit}
                onLogEvent={logSyntheticEvent}
              />
            </div>
          )}

          {/* TAB 3: STATE & EVENT INSPECTOR */}
          {activeTab === 'inspector' && (
            <div className="tab-pane animate-fade-in">
              <LiveStateInspector
                tasks={tasks}
                transactions={transactions}
                budgetLimit={budgetLimit}
                eventLogs={eventLogs}
                onClearLogs={handleClearLogs}
              />
            </div>
          )}

          {/* TAB 4: LAB MANUAL & VIVA */}
          {activeTab === 'manual' && (
            <div className="tab-pane animate-fade-in">
              <LabManualSection />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-container">
          <div className="footer-left">
            <span className="footer-title">College Web Development & MERN Stack Practicals</span>
            <span className="footer-copy">
              Practical 02: Props, State Management & Event Handling • Standalone Vite React Project
            </span>
          </div>
          <div className="footer-right">
            <Badge variant="neutral" size="sm">
              React 19 • State & Events Lab
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
