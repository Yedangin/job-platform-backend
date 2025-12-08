# 🚀 Quick Start Guide - Session Cookie Authentication

## Step 1: Start Your Server

```bash
# From project root
npx nx serve notification-service
npx nx serve api-gateway
```

Your servers should be running:
- API Gateway: `http://localhost:3000`
- Notification Service: `http://localhost:3001` (or configured port)

## Step 2: Open Test Client

### Using VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Browser will open automatically

### Using Python
```bash
# From test-client directory
python -m http.server 8080

# Open browser to http://localhost:8080
```

### Using Node.js
```bash
# Install http-server globally
npm install -g http-server

# From test-client directory
http-server -p 8080

# Open browser to http://localhost:8080
```

## Step 3: Login

1. **Enter your credentials**:
   - Email: `test@example.com`
   - Password: `your-password`
   
2. **Click "Login"**
   - This will call `/auth/login` endpoint
   - Session cookie will be set automatically
   - You'll be connected to chat WebSocket

3. **You should see**: "Connected as your@email.com"

## Step 4: Test the Chat

1. **Enter a conversation ID** (e.g., `test-conv-123`)
2. **Click "Join Conversation"**
3. **Type a message** and click "Send"

## Step 5: Test with Multiple Users

1. **Open another browser tab** (or incognito window)
2. **Login with a different user**:
   - Email: `user2@example.com`
   - Password: `password`
3. **Both users join the same conversation**
4. **Send messages back and forth!**

## 🎯 Quick Test Scenarios

### Test 1: Basic Login & Connection (30 seconds)
```
1. Enter email and password
2. Click "Login"
3. See "Connected" message
✅ Success: You see your email displayed in header
```

### Test 2: Join Conversation (1 minute)
```
1. Login successfully
2. Enter conversation ID: "test-conv-123"
3. Click "Join Conversation"
4. See "Joined conversation" message
✅ Success: Message input is now enabled
```

### Test 3: Send Message (1 minute)
```
1. Join a conversation
2. Type "Hello World"
3. Click Send
4. See your message appear
✅ Success: Message shows on the right (sent)
```

### Test 4: Two Users Chat (2 minutes)
```
1. Open two browser tabs
2. Login as user1@example.com in tab 1
3. Login as user2@example.com in tab 2
4. Both join "test-conv-123"
5. Send messages from both tabs
✅ Success: Messages appear in both tabs
```

## 🔍 Troubleshooting

### ❌ "Login failed"
**Check:**
- Is API Gateway running? (`npx nx serve api-gateway`)
- Are credentials correct?
- Check browser console for errors
- Check API Gateway logs

### ❌ "Authentication required" on WebSocket
**Solutions:**
- Make sure you logged in first
- Check if session cookie is set (Browser DevTools → Application → Cookies)
- Verify Redis is running (session storage)
- Check CORS settings allow credentials

### ❌ "Invalid or expired session"
**Solutions:**
- Login again (session may have expired)
- Check Redis connection
- Verify session TTL in Redis
- Check server logs for session validation errors

### ❌ CORS Error
**Fix in your gateway:**
```typescript
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:8080', // Your test client URL
    credentials: true, // Important!
  },
})
```

**Also check API Gateway CORS:**
```typescript
app.enableCors({
  origin: 'http://localhost:8080',
  credentials: true,
});
```

## 📊 What to Watch

### Browser Console (F12)
- Login response
- Session cookie being set
- WebSocket connection status
- Any JavaScript errors

### Application Tab (DevTools)
- Cookies → Check for `sessionId` cookie
- Should have `httpOnly`, `sameSite=lax`

### Network Tab
- Login request to `/auth/login`
- WebSocket connection to `/chat`
- Cookie headers being sent

### Events Log (in test client)
- All socket events in real-time
- Connection status
- Messages sent/received
- Errors

### Server Logs
- Login attempts
- Session creation
- WebSocket connections
- User authentication
- Any errors

## ✅ Success Indicators

You'll know it's working when you see:

1. **Login:**
   - "Login successful" message
   - `sessionId` cookie in browser
   - Automatic connection to chat

2. **Connection:**
   - "Connected as your@email.com" message
   - Green status indicator
   - Chat interface appears

3. **Join Conversation:**
   - "Joined conversation: test-conv-123" message
   - Message input becomes enabled
   - Events log shows "joined-conversation"

4. **Send Message:**
   - Your message appears on the right (blue)
   - Events log shows "new-message"
   - Other users see the message

5. **Multiple Users:**
   - Messages from other users appear on the left (white)
   - "User joined" notifications
   - Real-time message updates

## 🔐 Session Cookie Details

The session cookie is set by your API Gateway:
```javascript
{
  name: 'sessionId',
  httpOnly: true,
  secure: false (in development),
  sameSite: 'lax',
  maxAge: 2 hours,
  domain: 'localhost'
}
```

This cookie is automatically sent with:
- All REST API requests (with `credentials: 'include'`)
- WebSocket connection (with `withCredentials: true`)

## 🎉 Next Steps

Once basic chat is working:

1. **Test typing indicators** - Start typing and watch events
2. **Test group chat** - Create a group with 3+ users
3. **Test message seen** - Mark messages as read
4. **Test session expiry** - Wait 2 hours and see reconnection
5. **Test logout** - Click logout and verify session cleared

## 💡 Pro Tips

1. **Keep Events Log visible** - It shows everything happening
2. **Use browser DevTools** - Check cookies and network
3. **Test in incognito** - Easier to test multiple users
4. **Check server logs** - They show authentication flow
5. **Start simple** - Test login first, then add complexity

## 📞 Still Having Issues?

1. Verify both servers are running (API Gateway + Notification Service)
2. Check Redis is running (`redis-cli ping` should return `PONG`)
3. Verify CORS settings allow credentials
4. Check session cookie is being set
5. Look at server logs for detailed errors

---

**Happy Testing! 🚀**
