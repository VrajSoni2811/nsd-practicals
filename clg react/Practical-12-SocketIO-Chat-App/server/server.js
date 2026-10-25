import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5007;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// Socket.IO Server with CORS configuration
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Active Users & Room Trackers
// socketId -> { username, room, joinedAt }
const connectedUsers = new Map();

// Helper: Get users in a specific room
function getUsersInRoom(room) {
  const users = [];
  connectedUsers.forEach((user, socketId) => {
    if (user.room === room) {
      users.push({ socketId, username: user.username, joinedAt: user.joinedAt });
    }
  });
  return users;
}

// Socket Connection Lifecycle
io.on('connection', (socket) => {
  console.log(`⚡ [Socket Connected] ID: ${socket.id}`);

  // 1. Join Room
  socket.on('join_room', ({ username, room }) => {
    // If previously in a room, leave it
    const existing = connectedUsers.get(socket.id);
    if (existing && existing.room) {
      socket.leave(existing.room);
      io.to(existing.room).emit('user_left', {
        username: existing.username,
        message: `${existing.username} left the room.`,
        timestamp: new Date().toISOString()
      });
      io.to(existing.room).emit('room_users', getUsersInRoom(existing.room));
    }

    // Join new room
    socket.join(room);
    connectedUsers.set(socket.id, {
      username: username || 'Anonymous',
      room: room || 'general',
      joinedAt: new Date().toISOString()
    });

    console.log(`👤 [User Joined] ${username} joined #${room} (${socket.id})`);

    // System announcement to room
    socket.to(room).emit('user_joined', {
      username,
      message: `${username} joined the chat.`,
      timestamp: new Date().toISOString()
    });

    // Send updated user list to everyone in the room
    io.to(room).emit('room_users', getUsersInRoom(room));

    // Confirm to sender
    socket.emit('joined_confirmation', {
      room,
      username,
      users: getUsersInRoom(room),
      message: `Welcome to #${room}, ${username}!`
    });
  });

  // 2. Chat Message Broadcast
  socket.on('send_message', (payload) => {
    const user = connectedUsers.get(socket.id);
    const room = payload.room || (user ? user.room : 'general');

    const messageData = {
      id: `msg_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      room,
      username: payload.username || (user ? user.username : 'Anonymous'),
      message: payload.message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      senderId: socket.id
    };

    console.log(`💬 [#${room}] ${messageData.username}: ${messageData.message}`);

    // Broadcast to EVERYONE in the room including sender
    io.to(room).emit('receive_message', messageData);
  });

  // 3. Live Typing Indicator
  socket.on('typing', ({ room, username, isTyping }) => {
    // Broadcast to everyone in room EXCEPT sender
    socket.to(room).emit('user_typing', { username, isTyping });
  });

  // 4. Client Disconnect
  socket.on('disconnect', () => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      console.log(`🔌 [Disconnected] ${user.username} (${socket.id})`);
      socket.to(user.room).emit('user_left', {
        username: user.username,
        message: `${user.username} disconnected.`,
        timestamp: new Date().toISOString()
      });
      connectedUsers.delete(socket.id);
      io.to(user.room).emit('room_users', getUsersInRoom(user.room));
    }
  });
});

// REST Health Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    practical: 'Practical 12: Real-Time Chat App with Socket.IO',
    activeConnections: connectedUsers.size,
    availableRooms: ['general', 'react-devs', 'nodejs-backend', 'ai-agents'],
    timestamp: new Date().toISOString()
  });
});

// Start HTTP + Socket Server
server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Practical 12 Socket.IO Server on: http://localhost:${PORT}`);
  console.log(`📡 WebSocket Engine: ws://localhost:${PORT}`);
  console.log(`=======================================================`);
});
