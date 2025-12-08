# Quick Reference Card

## 🚀 Start Testing in 3 Steps

### 1. Start Servers
```bash
npx nx serve api-gateway          # Port 3000
npx nx serve notification-service # Port 3001
redis-server                       # Port 6379
```

### 2. Open Test Client
```bash
# Open test-client/index.html with Live Server
# Or open directly in browser
```

### 3. Login & Chat
```
Email: test@example.com
Password: your-password
→ Click "Login"
→ Enter conversation ID
→ Click "Join Conversation"
→ Start chatting!
```

---

## 📡 WebSocket Events

### Emit (Client → Server)
```javascript
socket.emit('join-conversation', { conversationId })
socket.emit('leave-conversation', { conversationId })
socket.emit('send-message', { conversationId, message })
socket.emit('typing', { conversationId, isTyping })
socket.emit('mark-seen', { messageId, conversationId })
socket.emit('get-online-users', { conversationId })
```

### Listen (Server → Client)
```javascript
socket.on('connected', data => {})      // Auth success
socket.on('error', error => {})         // Any error
socket.on('joined-conversation', data => {})
socket.on('left-conversation', data => {})
socket.on('new-message', data => {})
socket.on('user-joined', data => {})
socket.on('user-left', data => {})
socket.on('user-typing', data => {})
socket.on('message-seen', data => {})
socket.on('online-users', data => {})
```

---

## 🔐 Authentication

### Login Flow
```javascript
// 1. Login
POST /auth/login
{ email, password }
→ Sets sessionId cookie

// 2. Connect WebSocket
io('http://localhost:3000/chat', {
  withCredentials: true
})
→ Cookie sent automatically
→ Session validated from Redis
→ User authenticated ✅
```

### Session Cookie
```
Name: sessionId
HttpOnly: true
Secure: false (dev) / true (prod)
SameSite: lax
MaxAge: 2 hours
Domain: localhost
```

---

## 🛠️ REST API Endpoints

### Authentication
```bash
POST /auth/login              # Login
GET  /auth/profile            # Get profile
POST /auth/logout             # Logout
```

### Conversations
```bash
POST /chat/conversations/one-to-one    # Create 1-to-1
POST /chat/conversations/group         # Create group
GET  /chat/conversations/user/:userId  # Get user's convos
GET  /chat/conversations/:id           # Get details
POST /chat/conversations/:id/members   # Add member
POST /chat/conversations/:id/members/remove # Remove member
```

**Note:** All require `Cookie: sessionId=...`

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't login | Check API Gateway running, verify credentials |
| No cookie | Check DevTools → Application → Cookies |
| WebSocket fails | Login first, check `withCredentials: true` |
| CORS error | Enable `credentials: true` in CORS config |
| Session expired | Login again (2 hour expiry) |
| Redis error | Check Redis running: `redis-cli ping` |

---

## ✅ Success Checklist

- [ ] Both servers running (API Gateway + Notification Service)
- [ ] Redis running
- [ ] Test client open in browser
- [ ] Login successful
- [ ] sessionId cookie set (check DevTools)
- [ ] WebSocket connected
- [ ] Can join conversation
- [ ] Can send/receive messages

---

## 🔍 Debug Commands

```bash
# Check Redis
redis-cli ping                    # Should return PONG
redis-cli KEYS "session:*"        # List all sessions
redis-cli GET "session:xxx"       # Get session data

# Check servers
curl http://localhost:3000/auth   # API Gateway
curl http://localhost:3001        # Notification Service

# Check cookies (browser console)
document.cookie                   # Should show sessionId
```

---

## 💡 Pro Tips

1. **Use DevTools** - F12 → Application → Cookies
2. **Watch Events Log** - Shows all WebSocket events
3. **Multiple Tabs** - Test with different users
4. **Incognito Mode** - Easier multi-user testing
5. **Check Server Logs** - See authentication flow

---

## 📞 Need Help?

- `README.md` - Full documentation
- `QUICKSTART.md` - Step-by-step guide
- `CHAT_USAGE.md` - API reference
- Server logs - Detailed errors

---

**Happy Testing! 🎉**
