import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import StudentLabHeader from './components/StudentLabHeader.jsx';
import UserList from './components/UserList.jsx';
import ChatRoom from './components/ChatRoom.jsx';
import VivaSection from './components/VivaSection.jsx';

export default function App() {
  const [username, setUsername] = useState(`Dev_${Math.floor(100 + Math.random() * 900)}`);
  const [currentRoom, setCurrentRoom] = useState('general');
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [socketId, setSocketId] = useState('');

  const socketRef = useRef(null);

  // Initialize Socket.IO Client Connection
  useEffect(() => {
    // Connect to backend via Vite proxy or direct port
    const socket = io({
      transports: ['websocket', 'polling']
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('✅ Connected to Socket Server:', socket.id);
      setIsConnected(true);
      setSocketId(socket.id);

      // Join default room
      socket.emit('join_room', { username, room: 'general' });
    });

    socket.on('disconnect', () => {
      console.log('🔌 Disconnected from Socket Server');
      setIsConnected(false);
    });

    // Room user updates
    socket.on('room_users', (users) => {
      setOnlineUsers(users);
    });

    // Joined Confirmation
    socket.on('joined_confirmation', (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `sys_conf_${Date.now()}`,
          type: 'system',
          message: data.message
        }
      ]);
    });

    // User Joined Announcement
    socket.on('user_joined', (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `sys_join_${Date.now()}`,
          type: 'system',
          message: data.message
        }
      ]);
    });

    // User Left Announcement
    socket.on('user_left', (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `sys_left_${Date.now()}`,
          type: 'system',
          message: data.message
        }
      ]);
    });

    // Incoming Chat Message
    socket.on('receive_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Incoming Typing Indicator
    socket.on('user_typing', ({ username: typingName, isTyping }) => {
      setTypingUser(isTyping ? typingName : null);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Handle Room Switching
  const handleSelectRoom = (newRoom) => {
    if (newRoom === currentRoom) return;
    setCurrentRoom(newRoom);
    setMessages([]); // Clear previous channel feed
    socketRef.current?.emit('join_room', { username, room: newRoom });
  };

  // Handle Username Change
  const handleUsernameChange = (newName) => {
    setUsername(newName);
    socketRef.current?.emit('join_room', { username: newName, room: currentRoom });
  };

  // Send Message
  const handleSendMessage = (messageText) => {
    socketRef.current?.emit('send_message', {
      room: currentRoom,
      username,
      message: messageText
    });
  };

  // Send Typing Indicator
  const handleTyping = (isTyping) => {
    socketRef.current?.emit('typing', {
      room: currentRoom,
      username,
      isTyping
    });
  };

  return (
    <div>
      {/* Header */}
      <header className="app-header">
        <div className="header-container">
          <div className="logo-group">
            <span className="badge socket-badge">Practical 12</span>
            <div className="title-stack">
              <h1>Socket.IO Real-Time Chat Engine</h1>
              <p>Full-Duplex WebSockets • Room Channels • Online Presence Roster</p>
            </div>
          </div>

          <div className="header-controls">
            <div className="server-pill">
              <span className={`pulse-dot ${isConnected ? '' : 'disconnected'}`}></span>
              <span>{isConnected ? `Online (${socketId.slice(0, 6)}...)` : 'Reconnecting...'}</span>
            </div>
            <a href="#viva-section" className="btn-secondary btn-sm">Viva Voce Q&A</a>
          </div>
        </div>
      </header>

      {/* Main Chat Grid */}
      <main className="main-container">
        {/* 1st Semester Student Lab Record Header */}
        <StudentLabHeader />

        <div className="chat-container">
          {/* Left Sidebar */}
          <UserList
            currentRoom={currentRoom}
            onSelectRoom={handleSelectRoom}
            username={username}
            onUsernameChange={handleUsernameChange}
            onlineUsers={onlineUsers}
          />

          {/* Right Main Chat Window */}
          <ChatRoom
            currentRoom={currentRoom}
            username={username}
            messages={messages}
            onSendMessage={handleSendMessage}
            onTyping={handleTyping}
            typingUser={typingUser}
          />
        </div>

        {/* Academic Viva Voce */}
        <VivaSection />
      </main>
    </div>
  );
}
