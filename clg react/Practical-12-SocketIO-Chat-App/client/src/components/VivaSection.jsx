import React from 'react';

export default function VivaSection() {
  const vivaItems = [
    {
      q: 'Q1: What is Socket.IO and how does it differ from standard HTTP REST protocols?',
      a: 'HTTP is a unidirectional, stateless request-response protocol where clients must initiate every transaction. Socket.IO is a library built on top of the WebSocket protocol that enables persistent, low-latency, bidirectional, and event-driven communication between web browsers and Node.js servers without polling overhead.'
    },
    {
      q: 'Q2: How does Socket.IO handle fallbacks if WebSockets are blocked by firewalls or proxies?',
      a: 'Socket.IO starts by establishing a connection using HTTP Long-Polling (via the Engine.IO protocol). Once the HTTP handshake succeeds, it attempts to upgrade the transport layer transparently to full duplex WebSockets. If corporate proxies or firewalls block WebSocket upgrades, Socket.IO gracefully maintains connectivity over long-polling.'
    },
    {
      q: 'Q3: What are Socket.IO Rooms and how are they used in this application?',
      a: 'Rooms are arbitrary server-side channels that sockets can join and leave (using socket.join(room) and socket.leave(room)). They allow broadcasting targeted events exclusively to subsets of connected clients—such as io.to(room).emit("receive_message", ...)—without spamming other users outside the room.'
    },
    {
      q: 'Q4: What is the difference between `socket.emit()`, `socket.broadcast.emit()`, and `io.emit()`?',
      a: '1. socket.emit(): Sends the event ONLY to the single connected client associated with that socket.\n2. socket.broadcast.emit() or socket.to(room).emit(): Sends the event to ALL clients in the room EXCEPT the sender (e.g. used for typing indicators and join notices).\n3. io.emit() or io.to(room).emit(): Broadcasts the event to EVERY connected client in the room, including the sender.'
    },
    {
      q: 'Q5: How are Typing Indicators implemented efficiently without saturating network bandwidth?',
      a: 'A client emits a typing event when the input field value changes, and sets a debounce timer (e.g. 1500ms). When the timer expires without further keystrokes, a stopped typing event is emitted. The server broadcasts this state to peers using socket.to(room).emit("user_typing", ...).'
    },
    {
      q: 'Q6: What happens during a client disconnection?',
      a: 'When a browser tab closes or network drops, the Socket.IO heartbeat ping fails. The server triggers the "disconnect" event. In our server, we extract the user record, remove it from the connectedUsers map, and broadcast a "user_left" announcement along with an updated room member roster.'
    },
    {
      q: 'Q7: How do you scale Socket.IO across multiple server instances in production?',
      a: 'Since WebSockets maintain state in the memory of a single process, horizontal scaling requires an external publish/subscribe message broker like the Socket.IO Redis Adapter. When an event is emitted on Server A, the Redis adapter relays the packet to Server B and C so clients connected to other servers receive the message.'
    },
    {
      q: 'Q8: Why is React cleanup inside `useEffect` critical when dealing with Socket event listeners?',
      a: 'If event listeners registered via socket.on("event", handler) are not removed inside the useEffect cleanup function (socket.off("event")), new listeners accumulate on every component re-render. This causes memory leaks and duplicate message executions.'
    }
  ];

  return (
    <section id="viva-section" className="viva-container glass-panel">
      <div className="viva-header">
        <span className="badge">Academic Viva Reference</span>
        <h2>Practical 12: Viva Voce & Real-Time Socket Architecture</h2>
        <p>Comprehensive questions on WebSocket duplex streams, Socket.IO rooms, and event-driven architecture.</p>
      </div>

      <div className="accordion-list">
        {vivaItems.map((item, idx) => (
          <details key={idx} className="accordion-item" open={idx === 0}>
            <summary>{item.q}</summary>
            <div className="accordion-content">
              <p style={{ whiteSpace: 'pre-line' }}>{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
