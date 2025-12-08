# Chat Gateway Test Client - Session Cookie Authentication

A simple HTML/CSS/JS test client to test your WebSocket chat gateway with session-based authentication.

## 🚀 Quick Start

### 1. Start Your Servers
```bash
# Terminal 1: Start API Gateway
npx nx serve api-gateway

# Terminal 2: Start Notification Service
npx nx serve notification-service

# Terminal 3: Make sure Redis is running
redis-server
```

### 2. Open the Test Client
Open `index.html` with Live Server in VS Code:
- Right-click on `index.html`
- Select "Open with Live Server"

Or simply open `index.html` in your browser.

### 3. Login
1. Enter your email and password
2. Click "Login"
3. Session cookie will be set automatically
4. WebSocket will connect automatically
5. Start chatting!

## 📋 How It Works

### Authentication Flow
```
1. User enters credentials
   ↓
2. POST /auth/login
   ↓
3. Server validates credentials
   ↓
4. Server creates session in Redis
   ↓
5. Server sets sessionId cookie (httpOnly)
   ↓
6. Client connects to WebSocket
   ↓
7. Cookie is sent automatically
   ↓
8. Gateway validates session from Redis
   ↓
9. User is authenticated ✅
```

### Session Cookie
The session cookie is automatically:
- Set by the server on login
- Sent with all REST API requests (`credentials: 'include'`)
- Sent with WebSocket connection (`withCredentials: true`)
- Validated against Redis on every WebSocket connection

## 🎯 Testing Checklist

### Authentication
- [ ] Login with valid credentials
- [ ] Login with invalid credentials (should fail)
- [ ] Check sessionId cookie is set (DevTools → Application → Cookies)
- [ ] WebSocket connects automatically after login

### Conversation Management
- [ ] Join existing conversation
- [ ] Join non-existent conversation (should fail)
- [ ] Create one-to-one conversation
- [ ] Leave conversation

### Messaging
- [ ] Send message
- [ ] Receive message from another user
- [ ] See typing indicators
- [ ] Mark messages as seen

### Multiple Users
Open multiple browser tabs/windows to test:
- [ ] User A sends message, User B receives it
- [ ] Both users see each other join/leave
- [ ] Typing indicators work between users
- [ ] Online users list updates

### Session Management
- [ ] Logout clears session
- [ ] Session expires after 2 hours
- [ ] Invalid session disconnects WebSocket

## 🔧 Troubleshooting

### Connection Failed
**Problem:** "Authentication required" error

**Solutions:**
1. Make sure you logged in first
2. Check if sessionId cookie is set (DevTools → Application → Cookies)
3. Verify Redis is running (`redis-cli ping`)
4. Check server logs for authentication errors

### CORS Error
**Problem:** "CORS policy" error in browser console

**Solution:** Make sure your gateway and API have CORS enabled with credentials:

**Gateway:**
```typescript
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:8080', // Your test client URL
    credentials: true,
  },
})
```

**API Gateway:**
```typescript
app.enableCors({
  origin: 'http://localhost:8080',
  credentials: true,
});
```

### Cookie Not Being Set
**Problem:** No sessionId cookie after login

**Solutions:**
1. Check API Gateway is running
2. Check login endpoint returns success
3. Verify cookie domain matches (should be 'localhost')
4. Check browser console for errors

### Session Expired
**Problem:** "Invalid or expired session" after some time

**Solutions:**
1. Login again (sessions expire after 2 hours)
2. Check Redis TTL for sessions
3. Verify Redis is running and accessible

## 🎯 Testing Scenarios

### Scenario 1: One-to-One Chat
1. Open two browser tabs
2. Login as User A in tab 1 (user1@example.com)
3. Login as User B in tab 2 (user2@example.com)
4. Create conversation between User A and User B
5. Both users join the conversation
6. Send messages back and forth

### Scenario 2: Group Chat
1. Create a group conversation via REST API:
```bash
POST http://localhost:3000/chat/conversations/group
Cookie: sessionId=...
Content-Type: application/json

{
  "name": "Test Group",
  "creatorId": "user-1",
  "memberIds": ["user-2", "user-3"]
}
```
2. Open three browser tabs
3. Login as different users
4. All join the same conversation
5. Send messages and see them broadcast to all

### Scenario 3: Session Expiry
1. Login and connect to chat
2. Wait 2 hours (or modify session TTL for testing)
3. Try to send a message
4. Should get disconnected
5. Login again to reconnect

## 📊 Events Log

The Events Log at the bottom shows all WebSocket events:
- `connect` - Connected to server
- `connected` - Authentication successful
- `joined-conversation` - Joined a conversation
- `new-message` - New message received
- `user-joined` - Another user joined
- `user-left` - Another user left
- `user-typing` - Someone is typing
- `error` - Any errors

## 🔐 Security Features

### Session Cookie Security
- **httpOnly**: Cannot be accessed by JavaScript (XSS protection)
- **secure**: Only sent over HTTPS in production
- **sameSite**: CSRF protection
- **domain**: Restricted to your domain
- **maxAge**: Expires after 2 hours

### Redis Session Storage
- Fast session validation
- Automatic expiration
- Scalable across multiple servers

### Membership Verification
- Users can only join conversations they're members of
- Admin-only controls for group management

## 📝 REST API Endpoints

You can also test these endpoints with Postman/curl:

### Login
```bash
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

### Get Profile
```bash
GET http://localhost:3000/auth/profile
Cookie: sessionId=...
```

### Create One-to-One Conversation
```bash
POST http://localhost:3000/chat/conversations/one-to-one
Cookie: sessionId=...
Content-Type: application/json

{
  "userId1": "user-1",
  "userId2": "user-2"
}
```

### Create Group Conversation
```bash
POST http://localhost:3000/chat/conversations/group
Cookie: sessionId=...
Content-Type: application/json

{
  "name": "My Group",
  "creatorId": "user-1",
  "memberIds": ["user-2", "user-3", "user-4"]
}
```

### Get User Conversations
```bash
GET http://localhost:3000/chat/conversations/user/{userId}
Cookie: sessionId=...
```

### Logout
```bash
POST http://localhost:3000/auth/logout
Cookie: sessionId=...
```

## 🎨 Features

- ✅ Session cookie authentication
- ✅ Real-time messaging
- ✅ Join/leave conversations
- ✅ Typing indicators
- ✅ Online users tracking
- ✅ Message seen status
- ✅ Events logging
- ✅ Responsive design
- ✅ Multiple user testing (open multiple tabs)
- ✅ Automatic session management

## 💡 Tips

1. **Use Browser DevTools**: 
   - Console (F12) for logs
   - Application tab for cookies
   - Network tab for WebSocket frames

2. **Multiple Tabs**: Test with multiple browser tabs for multi-user scenarios

3. **Incognito Mode**: Use for testing different users without logging out

4. **Events Log**: Watch the events log to understand what's happening

5. **Check Cookies**: Verify sessionId cookie is set after login

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Can't login | Check API Gateway is running, verify credentials |
| No cookie set | Check CORS allows credentials, verify domain |
| WebSocket won't connect | Login first, check cookie is set |
| Session expired | Login again, check Redis TTL |
| CORS error | Enable credentials in CORS config |
| Can't see other users | Open multiple browser tabs with different users |

## 📞 Need Help?

Check the documentation:
- `QUICKSTART.md` - Step-by-step quick start guide
- `CHAT_USAGE.md` - Complete API documentation
- `IMPROVEMENTS.md` - What changed and why
- Server logs for detailed error messages

## 🔄 Session Lifecycle

```
Login → Session Created in Redis → Cookie Set → WebSocket Connects
  ↓                                                      ↓
  ↓                                              User Authenticated
  ↓                                                      ↓
  ↓                                              Chat Features Available
  ↓                                                      ↓
Logout → Session Deleted from Redis → Cookie Cleared → Disconnected
```

---

**Happy Testing! 🚀**
