import React, { useState } from 'react';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PlusCircle,
  Trash2,
  PieChart,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Card } from '../common/Card';
import './BudgetTracker.css';

/**
 * BudgetTracker Feature Component
 * Demonstrates:
 * 1. Multi-field Form Object State (formData object with computed property names)
 * 2. Counter / Numerical State with functional updaters (prev => prev + 500)
 * 3. Array State transformations (filter, reduce)
 * 4. SyntheticEvent handling (onSubmit, onChange, onClick)
 */
export const BudgetTracker = ({
  transactions,
  setTransactions,
  budgetLimit,
  setBudgetLimit,
  onLogEvent
}) => {
  // Multi-input form object state
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense', // 'expense' | 'income'
    category: 'Education'
  });

  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'income' | 'expense'

  // Generic controlled input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    onLogEvent({
      type: 'onChange',
      target: `FormField [${name}]`,
      details: `Updated ${name} to "${value}"`
    });
  };

  // Add transaction submit handler
  const handleAddTransaction = (e) => {
    e.preventDefault();

    const numericAmount = parseFloat(formData.amount);
    if (!formData.title.trim()) {
      alert('Please enter a description!');
      return;
    }
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert('Please enter a valid positive amount!');
      return;
    }

    const newTx = {
      id: Date.now(),
      title: formData.title.trim(),
      amount: numericAmount,
      type: formData.type,
      category: formData.category,
      date: new Date().toISOString().split('T')[0]
    };

    setTransactions((prev) => [newTx, ...prev]);

    // Reset form
    setFormData({
      title: '',
      amount: '',
      type: 'expense',
      category: 'Education'
    });

    onLogEvent({
      type: 'onSubmit',
      target: 'TransactionForm',
      details: `Added ${newTx.type} of $${newTx.amount} for "${newTx.title}"`
    });
  };

  // Delete transaction handler
  const handleDeleteTx = (id) => {
    const target = transactions.find((t) => t.id === id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));

    onLogEvent({
      type: 'onClick',
      target: `DeleteTxButton #${id}`,
      details: `Deleted ${target?.type} "${target?.title}" ($${target?.amount})`
    });
  };

  // Functional state updater for numerical budget adjustment
  const adjustBudget = (amount) => {
    setBudgetLimit((prev) => {
      const updated = Math.max(500, prev + amount);
      onLogEvent({
        type: 'onClick',
        target: 'BudgetAdjustment',
        details: `Adjusted budget limit from $${prev} to $${updated} via updater function (prev => prev + ${amount})`
      });
      return updated;
    });
  };

  // Computed state values (pure calculations)
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netBalance = totalIncome - totalExpense;
  const budgetUtilization = Math.min(100, Math.round((totalExpense / budgetLimit) * 100));

  // Filtered transactions
  const filteredTx = transactions.filter((t) => {
    if (typeFilter === 'income') return t.type === 'income';
    if (typeFilter === 'expense') return t.type === 'expense';
    return true;
  });

  return (
    <div className="budget-container">
      {/* Financial Overview Cards */}
      <div className="budget-summary-grid">
        <div className="summary-card net-balance">
          <div className="summary-header">
            <span>Net Balance</span>
            <Wallet size={18} />
          </div>
          <div className={`summary-amount ${netBalance >= 0 ? 'positive' : 'negative'}`}>
            ${netBalance.toLocaleString()}
          </div>
          <span className="summary-sub">Total Available Liquidity</span>
        </div>

        <div className="summary-card total-income">
          <div className="summary-header">
            <span>Total Income</span>
            <TrendingUp size={18} className="income-icon" />
          </div>
          <div className="summary-amount income-amount">+${totalIncome.toLocaleString()}</div>
          <span className="summary-sub">{transactions.filter((t) => t.type === 'income').length} deposits recorded</span>
        </div>

        <div className="summary-card total-expense">
          <div className="summary-header">
            <span>Total Expense</span>
            <TrendingDown size={18} className="expense-icon" />
          </div>
          <div className="summary-amount expense-amount">-${totalExpense.toLocaleString()}</div>
          <span className="summary-sub">{transactions.filter((t) => t.type === 'expense').length} payments made</span>
        </div>

        <div className="summary-card budget-limit-card">
          <div className="summary-header">
            <span>Monthly Budget Cap</span>
            <PieChart size={18} />
          </div>
          <div className="summary-amount">${budgetLimit.toLocaleString()}</div>
          <div className="budget-controls">
            <span className="control-label">Functional State Updater:</span>
            <div className="budget-btn-row">
              <button
                type="button"
                className="budget-stepper-btn"
                onClick={() => adjustBudget(-500)}
                title="Decrease limit by $500"
              >
                -$500
              </button>
              <button
                type="button"
                className="budget-stepper-btn"
                onClick={() => adjustBudget(500)}
                title="Increase limit by $500"
              >
                +$500
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar-header">
          <span>Budget Spend: <strong>${totalExpense.toLocaleString()}</strong> of <strong>${budgetLimit.toLocaleString()}</strong></span>
          <span className={`progress-percentage ${budgetUtilization > 85 ? 'warning' : ''}`}>
            {budgetUtilization}% Utilized
          </span>
        </div>
        <div className="progress-track">
          <div
            className={`progress-fill ${budgetUtilization > 85 ? 'fill-warning' : ''}`}
            style={{ width: `${budgetUtilization}%` }}
          />
        </div>
      </div>

      {/* Two Column Layout: Add Form & Transaction History */}
      <div className="budget-main-grid">
        {/* Left: Controlled Form for New Transaction */}
        <Card variant="glass" padding="md" className="tx-form-card">
          <h3 className="card-subheading">
            <PlusCircle size={18} /> Record New Transaction
          </h3>

          <form onSubmit={handleAddTransaction} className="tx-form">
            <div className="form-group">
              <label className="form-label">Transaction Type:</label>
              <div className="tx-type-toggle">
                <button
                  type="button"
                  className={`type-btn ${formData.type === 'expense' ? 'active-expense' : ''}`}
                  onClick={() => setFormData((prev) => ({ ...prev, type: 'expense' }))}
                >
                  <ArrowDownLeft size={16} /> Expense
                </button>
                <button
                  type="button"
                  className={`type-btn ${formData.type === 'income' ? 'active-income' : ''}`}
                  onClick={() => setFormData((prev) => ({ ...prev, type: 'income' }))}
                >
                  <ArrowUpRight size={16} /> Income
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description / Title:</label>
              <input
                type="text"
                name="title"
                className="form-input"
                placeholder="e.g. Lab Manual purchase, Project Stipend"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-row-half">
              <div className="form-group">
                <label className="form-label">Amount ($):</label>
                <input
                  type="number"
                  name="amount"
                  min="1"
                  step="any"
                  className="form-input"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category:</label>
                <select
                  name="category"
                  className="form-input"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="Education">Education</option>
                  <option value="Software">Software</option>
                  <option value="College">College</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              icon={<DollarSign size={16} />}
            >
              Add {formData.type === 'income' ? 'Income' : 'Expense'}
            </Button>
          </form>
        </Card>

        {/* Right: Transactions History */}
        <div className="tx-list-container">
          <div className="tx-list-header">
            <div>
              <h3 className="card-subheading">Transaction History</h3>
              <p className="tx-subtitle">Passing transaction props down to rows</p>
            </div>

            <div className="tx-filter-pills">
              <button
                type="button"
                className={`filter-mini-pill ${typeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setTypeFilter('all')}
              >
                All
              </button>
              <button
                type="button"
                className={`filter-mini-pill ${typeFilter === 'income' ? 'active' : ''}`}
                onClick={() => setTypeFilter('income')}
              >
                Income
              </button>
              <button
                type="button"
                className={`filter-mini-pill ${typeFilter === 'expense' ? 'active' : ''}`}
                onClick={() => setTypeFilter('expense')}
              >
                Expense
              </button>
            </div>
          </div>

          <div className="tx-scroll-list">
            {filteredTx.length === 0 ? (
              <div className="empty-tx">No transactions in this category.</div>
            ) : (
              filteredTx.map((tx) => (
                <div key={tx.id} className={`tx-row tx-${tx.type}`}>
                  <div className="tx-icon-box">
                    {tx.type === 'income' ? (
                      <ArrowUpRight size={18} className="income-arrow" />
                    ) : (
                      <ArrowDownLeft size={18} className="expense-arrow" />
                    )}
                  </div>
                  <div className="tx-info">
                    <span className="tx-title">{tx.title}</span>
                    <div className="tx-sub-meta">
                      <Badge variant="purple" size="sm">
                        {tx.category}
                      </Badge>
                      <span className="tx-date">{tx.date}</span>
                    </div>
                  </div>
                  <div className="tx-amount-col">
                    <span className={`tx-amount-text ${tx.type}`}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount}
                    </span>
                    <button
                      type="button"
                      className="tx-delete-btn"
                      onClick={() => handleDeleteTx(tx.id)}
                      title="Delete record"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
