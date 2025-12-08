# Chat Gateway Usage Guide

## Overview
This WebSocket gateway handles real-time chat functionality for both **one-to-one** and **group conversations** with JWT authentication.

## Authentication

### Connection
Connect to the WebSocket with JWT token:

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000/chat', {
  auth: {
    token: 'your-jwt-token-here'
  }
});

// Or via authorization header
const socket = io('http://localhost:3000/chat', {
  extraHeaders: {
    authorization: 'Bearer your-jwt-token-here'
  }
});
```

### Events on Connection
- `connected` - Emitted when successfully authenticated
- `error` - Emitted when authentication fails
- Socket will disconnect if no valid token provided

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
  console.log(`User ${data.userId} joined the conversation`);
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
  constructor(token) {
    this.socket = io('http://localhost:3000/chat', {
      auth: { token }
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

  disconnect() {
    this.socket.disconnect();
  }
}

// Usage
const chat = new ChatClient('your-jwt-token');
chat.joinConversation('conv-123');
chat.sendMessage('conv-123', 'Hello!');
```

## REST API Endpoints (via ChatService)

These methods are available in the ChatService for REST endpoints:

### Create One-to-One Conversation
```typescript
await chatService.createOneToOneConversation(userId1, userId2);
```

### Create Group Conversation
```typescript
await chatService.createGroupConversation(
  'Group Name',
  creatorId,
  [memberId1, memberId2, memberId3]
);
```

### Get User Conversations
```typescript
await chatService.getUserConversations(userId);
```

### Add Member to Group
```typescript
await chatService.addMemberToGroup(conversationId, newUserId, adminUserId);
```

### Remove Member from Group
```typescript
await chatService.removeMemberFromGroup(conversationId, userIdToRemove, adminUserId);
```

## Security Features

1. **JWT Authentication**: All connections require valid JWT token
2. **Membership Verification**: Users can only join conversations they're members of
3. **Admin Controls**: Only admins can add/remove members in groups
4. **Automatic Disconnection**: Invalid tokens result in immediate disconnect

## Database Schema

The gateway uses these Prisma models:
- `Conversation` - Chat rooms (one-to-one or group)
- `ConversationMember` - User membership in conversations
- `Message` - Chat messages

## Error Handling

All errors are emitted via the `error` event:

```javascript
socket.on('error', (error) => {
  console.error('Chat error:', error.message);
});
```

Common errors:
- "Authentication required" - No token provided
- "Invalid or expired token" - Token verification failed
- "You are not a member of this conversation" - Access denied
- "Only admins can add/remove members" - Permission denied
