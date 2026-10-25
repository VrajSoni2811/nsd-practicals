import React from 'react';

const ROOMS = [
  { id: 'general', name: '#general', label: 'General Discussion' },
  { id: 'react-devs', name: '#react-devs', label: 'React 19 & Frontend' },
  { id: 'nodejs-backend', name: '#nodejs-backend', label: 'Node.js & Express' },
  { id: 'ai-agents', name: '#ai-agents', label: 'AI & Machine Learning' }
];

export default function UserList({ currentRoom, onSelectRoom, username, onUsernameChange, onlineUsers }) {
  return (
    <aside className="chat-sidebar glass-panel">
      {/* Identity Profile */}
      <div className="sidebar-section">
        <span className="section-label">Your Chat Handle</span>
        <div className="user-tag-box">
          <span>👤</span>
          <input
            type="text"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            placeholder="Your name..."
            maxLength={18}
          />
        </div>
      </div>

      {/* Thematic Channels / Rooms */}
      <div className="sidebar-section">
        <span className="section-label">Chat Channels</span>
        <div className="rooms-list">
          {ROOMS.map((r) => (
            <button
              key={r.id}
              className={`room-tab-btn ${currentRoom === r.id ? 'active' : ''}`}
              onClick={() => onSelectRoom(r.id)}
            >
              <span>{r.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Online Users in Current Room */}
      <div className="sidebar-section" style={{ marginTop: 'auto' }}>
        <span className="section-label">Active in #{currentRoom} ({onlineUsers.length})</span>
        <div className="online-users-list">
          {onlineUsers.length > 0 ? (
            onlineUsers.map((u) => (
              <div key={u.socketId} className="user-chip">
                <span className="status-indicator"></span>
                <span>{u.username}</span>
                {u.username === username && <small style={{ color: 'var(--accent-cyan)' }}>(You)</small>}
              </div>
            ))
          ) : (
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Waiting for users...</div>
          )}
        </div>
      </div>
    </aside>
  );
}
