# Chat Gateway Usage Guide - Session Cookie Authentication

## Overview
This WebSocket gateway handles real-time chat functionality for both **one-to-one** and **group conversations** with **session cookie authentication**.

## Authentication

### How It Works
1. User logs in via REST API (`POST /auth/login`)
2. Server sets `sessionId` cookie (httpOnly, secure)
3. Cookie is automatically sent with WebSocket connection
4. Gateway validates session from Redis
5. User data is attached to socket connection

### Connection
Connect to the WebSocket - cookies are sent automatically:

```javascript
import { io } from 'socket.io-client';

// First, login via REST API
const loginResponse = await fetch('http://localhost:3000/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include', // Important: Include cookies
  body: JSON.stringify({ email: 'user@example.com', password: 'password' })
});

// Then connect to WebSocket - session cookie is sent automatically
const socket = io('http://localhost:3000/chat', {
  withCredentials: true, // Important: Send cookies
  transports: ['websocket', 'polling']
});
```

### Events on Connection
- `connected` - Emitted when successfully authenticated
- `error` - Emitted when authentication fails
- Socket will disconnect if no valid session cookie

## Available Events

### 1. Join Conversation
Join a conversation room (one-to-one or group).

**Emit:**
```javascript
socket.emit('join-conversation', {
  conversationId: 'conversation-id-here'
});
```

**Receive:**
```javascript
socket.on('joined-conversation', (data) => {
  console.log('Joined:', data.conversationId);
  console.log('Conversation details:', data.conversation);
});

socket.on('user-joined', (data) => {
  console.log(`User ${data.email} joined the conversation`);
});
```

### 2. Leave Conversation
Leave a conversation room.

**Emit:**
```javascript
socket.emit('leave-conversation', {
  conversationId: 'conversation-id-here'
});
```

**Receive:**
```javascript
socket.on('left-conversation', (data) => {
  console.log('Left conversation:', data.conversationId);
});

socket.on('user-left', (data) => {
  console.log(`User ${data.userId} left the conversation`);
});
```

### 3. Send Message
Send a message to a conversation (one-to-one or group).

**Emit:**
```javascript
socket.emit('send-message', {
  conversationId: 'conversation-id-here',
  message: 'Hello everyone!'
});
```

**Receive:**
```javascript
socket.on('new-message', (data) => {
  console.log('New message:', {
    id: data.id,
    conversationId: data.conversationId,
    message: data.message,
    senderId: data.senderId,
    senderEmail: data.senderEmail,
    createdAt: data.createdAt
  });
});
```

### 4. Typing Indicator
Show when a user is typing.

**Emit:**
```javascript
// User starts typing
socket.emit('typing', {
  conversationId: 'conversation-id-here',
  isTyping: true
});

// User stops typing
socket.emit('typing', {
  conversationId: 'conversation-id-here',
  isTyping: false
});
```

**Receive:**
```javascript
socket.on('user-typing', (data) => {
  console.log(`User ${data.userId} is ${data.isTyping ? 'typing' : 'stopped typing'}`);
});
```

### 5. Mark Message as Seen
Mark a message as read.

**Emit:**
```javascript
socket.emit('mark-seen', {
  messageId: 'message-id-here',
  conversationId: 'conversation-id-here'
});
```

**Receive:**
```javascript
socket.on('message-seen', (data) => {
  console.log(`Message ${data.messageId} seen by ${data.seenBy}`);
});
```

### 6. Get Online Users
Get list of users currently online in a conversation.

**Emit:**
```javascript
socket.emit('get-online-users', {
  conversationId: 'conversation-id-here'
});
```

**Receive:**
```javascript
socket.on('online-users', (data) => {
  console.log('Online users:', data.users);
  // data.users = [{ userId: '...', email: '...' }, ...]
});
```

## Complete Client Example

```javascript
import { io } from 'socket.io-client';

class ChatClient {
  constructor() {
    this.socket = null;
  }

  async login(email, password) {
    // Login via REST API
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    // Connect to WebSocket
    this.connect();
  }

  connect() {
    this.socket = io('http://localhost:3000/chat', {
      withCredentials: true
    });

    this.setupListeners();
  }

  setupListeners() {
    this.socket.on('connected', (data) => {
      console.log('Connected:', data);
    });

    this.socket.on('error', (error) => {
      console.error('Error:', error.message);
    });

    this.socket.on('new-message', (message) => {
      console.log('New message:', message);
    });

    this.socket.on('user-joined', (data) => {
      console.log('User joined:', data);
    });

    this.socket.on('user-left', (data) => {
      console.log('User left:', data);
    });

    this.socket.on('user-typing', (data) => {
      console.log('User typing:', data);
    });
  }

  joinConversation(conversationId) {
    this.socket.emit('join-conversation', { conversationId });
  }

  sendMessage(conversationId, message) {
    this.socket.emit('send-message', { conversationId, message });
  }

  setTyping(conversationId, isTyping) {
    this.socket.emit('typing', { conversationId, isTyping });
  }

  markSeen(messageId, conversationId) {
    this.socket.emit('mark-seen', { messageId, conversationId });
  }

  async logout() {
    // Logout via REST API
    await fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });

    this.socket.disconnect();
  }
}

// Usage
const chat = new ChatClient();
await chat.login('user@example.com', 'password');
chat.joinConversation('conv-123');
chat.sendMessage('conv-123', 'Hello!');
```

## REST API Endpoints (via ChatService)

These methods are available in the ChatService for REST endpoints:

### Create One-to-One Conversation
```bash
POST /chat/conversations/one-to-one
Content-Type: application/json
Cookie: sessionId=...

{
  "userId1": "user-1",
  "userId2": "user-2"
}
```

### Create Group Conversation
```bash
POST /chat/conversations/group
Content-Type: application/json
Cookie: sessionId=...

{
  "name": "Group Name",
  "creatorId": "user-1",
  "memberIds": ["user-2", "user-3"]
}
```

### Get User Conversations
```bash
GET /chat/conversations/user/{userId}
Cookie: sessionId=...
```

### Get Conversation Details
```bash
GET /chat/conversations/{conversationId}
Cookie: sessionId=...
```

### Add Member to Group
```bash
POST /chat/conversations/{conversationId}/members
Content-Type: application/json
Cookie: sessionId=...

{
  "userId": "new-user-id",
  "addedBy": "admin-user-id"
}
```

### Remove Member from Group
```bash
POST /chat/conversations/{conversationId}/members/remove
Content-Type: application/json
Cookie: sessionId=...

{
  "userId": "user-to-remove",
  "removedBy": "admin-user-id"
}
```

## Security Features

1. **Session Cookie Authentication**: Secure, httpOnly cookies
2. **Redis Session Storage**: Fast session validation
3. **Membership Verification**: Users can only join conversations they're members of
4. **Admin Controls**: Only admins can add/remove members in groups
5. **Automatic Disconnection**: Invalid sessions result in immediate disconnect

## Database Schema

The gateway uses these Prisma models:
- `Conversation` - Chat rooms (one-to-one or group)
- `ConversationMember` - User membership in conversations
- `Message` - Chat messages

## Session Cookie Details

The session cookie is set by your API Gateway on login:
```javascript
{
  name: 'sessionId',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 2 * 60 * 60 * 1000, // 2 hours
  domain: process.env.COOKIE_DOMAIN || 'localhost'
}
```

Session data stored in Redis:
```javascript
{
  userId: 'user-123',
  email: 'user@example.com',
  role: 'MEMBER',
  accessToken: '...',
  refreshToken: '...'
}
```

## Error Handling

All errors are emitted via the `error` event:

```javascript
socket.on('error', (error) => {
  console.error('Chat error:', error.message);
});
```

Common errors:
- "Authentication required" - No session cookie provided
- "Invalid or expired session" - Session not found in Redis
- "You are not a member of this conversation" - Access denied
- "Only admins can add/remove members" - Permission denied

## CORS Configuration

Make sure your gateway has CORS enabled with credentials:

```typescript
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:8080', // Your client URL
    credentials: true, // Important!
  },
  namespace: '/chat',
})
```

Also configure your API Gateway:
```typescript
app.enableCors({
  origin: 'http://localhost:8080',
  credentials: true,
});
```

## Testing

Use the provided test client in `test-client/` directory:
1. Open `index.html` with Live Server
2. Login with your credentials
3. Session cookie is automatically set
4. WebSocket connects automatically
5. Start chatting!

See `QUICKSTART.md` for detailed testing instructions.
