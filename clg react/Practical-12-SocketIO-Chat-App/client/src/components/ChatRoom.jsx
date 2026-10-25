import React, { useState, useEffect, useRef } from 'react';

export default function ChatRoom({ currentRoom, username, messages, onSendMessage, onTyping, typingUser }) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingUser]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);

    // Emit typing status
    onTyping(true);

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      onTyping(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    onSendMessage(inputText.trim());
    setInputText('');
    onTyping(false);
    clearTimeout(typingTimeoutRef.current);
  };

  return (
    <section className="chat-window glass-panel">
      {/* Room Header */}
      <div className="chat-header">
        <div>
          <h3 className="room-title-h3">#{currentRoom}</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Real-time Bidirectional WebSocket Stream
          </span>
        </div>
        <span className="badge" style={{ background: 'rgba(6,182,212,0.1)', color: 'var(--accent-cyan)' }}>
          Active Room
        </span>
      </div>

      {/* Messages Feed */}
      <div className="messages-feed">
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', margin: 'auto', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            No messages in #{currentRoom} yet. Say hello to start the conversation!
          </div>
        ) : (
          messages.map((msg) => {
            if (msg.type === 'system') {
              return (
                <div key={msg.id} className="system-notice">
                  📢 {msg.message}
                </div>
              );
            }

            const isOutgoing = msg.username === username;

            return (
              <div
                key={msg.id}
                className={`message-row ${isOutgoing ? 'outgoing' : 'incoming'}`}
              >
                <div className="message-meta">
                  <strong>{isOutgoing ? 'You' : msg.username}</strong>
                  <span>{msg.timestamp}</span>
                </div>
                <div className="message-bubble">{msg.message}</div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing Indicator */}
      <div className="typing-bar">
        {typingUser ? `✍️ ${typingUser} is typing...` : ''}
      </div>

      {/* Chat Input Bar */}
      <form onSubmit={handleSubmit} className="chat-input-bar">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder={`Message #${currentRoom}...`}
          className="chat-input-box"
        />
        <button type="submit" className="btn-primary">
          Send
        </button>
      </form>
    </section>
  );
}
