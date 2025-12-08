// State
let socket = null;
let currentUser = null;
let currentConversationId = null;
let apiUrl = '';

// DOM Elements
const loginSection = document.getElementById('loginSection');
const chatSection = document.getElementById('chatSection');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const apiUrlInput = document.getElementById('apiUrl');
const loginBtn = document.getElementById('loginBtn');
const disconnectBtn = document.getElementById('disconnectBtn');
const connectionStatus = document.getElementById('connectionStatus');
const userInfo = document.getElementById('userInfo');
const conversationIdInput = document.getElementById('conversationId');
const joinConvBtn = document.getElementById('joinConvBtn');
const createUser1Input = document.getElementById('createUser1');
const createUser2Input = document.getElementById('createUser2');
const createConvBtn = document.getElementById('createConvBtn');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const eventsLog = document.getElementById('eventsLog');
const clearLogBtn = document.getElementById('clearLogBtn');

// Event Listeners
loginBtn.addEventListener('click', login);
disconnectBtn.addEventListener('click', logout);
joinConvBtn.addEventListener('click', joinConversation);
createConvBtn.addEventListener('click', createOneToOneConversation);
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
clearLogBtn.addEventListener('click', () => {
    eventsLog.innerHTML = '';
});

// Login Function
async function login() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    apiUrl = apiUrlInput.value.trim();

    if (!email || !password) {
        showStatus('Please enter email and password', 'error');
        return;
    }

    if (!apiUrl) {
        showStatus('Please enter API URL', 'error');
        return;
    }

    showStatus('Logging in...', 'success');
    loginBtn.disabled = true;

    try {
        // Login via REST API to get session cookie
        const response = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Important: Include cookies
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }

        const data = await response.json();
        showStatus(data.message || 'Login successful', 'success');

        // Get user profile to verify session
        const profileResponse = await fetch(`${apiUrl}/auth/profile`, {
            credentials: 'include'
        });

        if (!profileResponse.ok) {
            throw new Error('Failed to get profile');
        }

        const profile = await profileResponse.json();
        currentUser = profile.user;

        logEvent('login', { email, userId: currentUser.id });

        // Now connect to WebSocket with session cookie
        connectToChat();

    } catch (error) {
        showStatus(`Login error: ${error.message}`, 'error');
        loginBtn.disabled = false;
        logEvent('login-error', error.message);
    }
}

// Connect to Chat WebSocket
function connectToChat() {
    showStatus('Connecting to chat...', 'success');

    try {
        // Connect to WebSocket - cookies will be sent automatically
        const chatUrl = `${apiUrl}/chat`;
        
        socket = io(chatUrl, {
            withCredentials: true, // Important: Send cookies with WebSocket
            transports: ['websocket', 'polling']
        });

        setupSocketListeners();
    } catch (error) {
        showStatus(`Connection error: ${error.message}`, 'error');
        loginBtn.disabled = false;
    }
}

// Setup Socket Listeners
function setupSocketListeners() {
    socket.on('connect', () => {
        logEvent('connect', 'Connected to server');
    });

    socket.on('connected', (data) => {
        logEvent('connected', data);
        currentUser = { ...currentUser, ...data };
        showStatus(`Connected as ${data.email}`, 'success');
        
        // Switch to chat section
        loginSection.classList.add('hidden');
        chatSection.classList.remove('hidden');
        userInfo.textContent = `Logged in as: ${data.email} (${data.userId})`;
    });

    socket.on('error', (error) => {
        logEvent('error', error);
        showStatus(`Error: ${error.message}`, 'error');
        loginBtn.disabled = false;
    });

    socket.on('disconnect', () => {
        logEvent('disconnect', 'Disconnected from server');
        showStatus('Disconnected', 'error');
    });

    socket.on('joined-conversation', (data) => {
        logEvent('joined-conversation', data);
        currentConversationId = data.conversationId;
        addSystemMessage(`Joined conversation: ${data.conversationId}`);
        messageInput.disabled = false;
        sendBtn.disabled = false;
    });

    socket.on('left-conversation', (data) => {
        logEvent('left-conversation', data);
        addSystemMessage(`Left conversation: ${data.conversationId}`);
        messageInput.disabled = true;
        sendBtn.disabled = true;
    });

    socket.on('new-message', (data) => {
        logEvent('new-message', data);
        addMessage(data);
    });

    socket.on('user-joined', (data) => {
        logEvent('user-joined', data);
        addSystemMessage(`${data.email} joined the conversation`);
    });

    socket.on('user-left', (data) => {
        logEvent('user-left', data);
        addSystemMessage(`User ${data.userId} left the conversation`);
    });

    socket.on('user-typing', (data) => {
        logEvent('user-typing', data);
        if (data.isTyping) {
            addSystemMessage(`User ${data.userId} is typing...`);
        }
    });

    socket.on('message-seen', (data) => {
        logEvent('message-seen', data);
        addSystemMessage(`Message seen by ${data.seenBy}`);
    });

    socket.on('online-users', (data) => {
        logEvent('online-users', data);
        addSystemMessage(`Online users: ${data.users.length}`);
    });
}

// Logout Function
async function logout() {
    try {
        // Logout via REST API to clear session
        await fetch(`${apiUrl}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });

        if (socket) {
            socket.disconnect();
            socket = null;
        }

        resetToLogin();
        showStatus('Logged out successfully', 'success');
    } catch (error) {
        console.error('Logout error:', error);
        resetToLogin();
    }
}

// Reset to Login
function resetToLogin() {
    loginSection.classList.remove('hidden');
    chatSection.classList.add('hidden');
    loginBtn.disabled = false;
    messageInput.disabled = true;
    sendBtn.disabled = true;
    messagesDiv.innerHTML = '';
    currentUser = null;
    currentConversationId = null;
}

// Join Conversation
function joinConversation() {
    const conversationId = conversationIdInput.value.trim();

    if (!conversationId) {
        alert('Please enter a conversation ID');
        return;
    }

    if (!socket || !socket.connected) {
        alert('Not connected to server');
        return;
    }

    socket.emit('join-conversation', { conversationId });
}

// Create One-to-One Conversation
async function createOneToOneConversation() {
    const user1 = createUser1Input.value.trim();
    const user2 = createUser2Input.value.trim();

    if (!user1 || !user2) {
        alert('Please enter both user IDs');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/chat/conversations/one-to-one`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ userId1: user1, userId2: user2 })
        });

        const data = await response.json();
        logEvent('create-conversation', data);
        
        if (data.id) {
            conversationIdInput.value = data.id;
            addSystemMessage(`Conversation created: ${data.id}`);
        }
    } catch (error) {
        logEvent('error', { message: error.message });
        alert(`Error creating conversation: ${error.message}`);
    }
}

// Send Message
function sendMessage() {
    const message = messageInput.value.trim();

    if (!message) return;

    if (!socket || !socket.connected) {
        alert('Not connected to server');
        return;
    }

    if (!currentConversationId) {
        alert('Please join a conversation first');
        return;
    }

    socket.emit('send-message', {
        conversationId: currentConversationId,
        message: message
    });

    messageInput.value = '';
}

// Add Message to UI
function addMessage(data) {
    const messageDiv = document.createElement('div');
    const isSent = data.senderId === currentUser?.userId;
    
    messageDiv.className = `message ${isSent ? 'sent' : 'received'}`;
    
    let html = '';
    if (!isSent) {
        html += `<div class="message-sender">${data.senderEmail || data.senderId}</div>`;
    }
    html += `<div class="message-text">${escapeHtml(data.message)}</div>`;
    html += `<div class="message-time">${formatTime(data.createdAt)}</div>`;
    
    messageDiv.innerHTML = html;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Add System Message
function addSystemMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message system';
    messageDiv.innerHTML = `<div class="message-text">${escapeHtml(text)}</div>`;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Log Event
function logEvent(event, data) {
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    
    const time = new Date().toLocaleTimeString();
    const dataStr = typeof data === 'object' ? JSON.stringify(data, null, 2) : data;
    
    logEntry.innerHTML = `
        <span class="log-time">[${time}]</span>
        <span class="log-event">${event}</span>
        <span class="log-data">${escapeHtml(dataStr)}</span>
    `;
    
    eventsLog.appendChild(logEntry);
    eventsLog.scrollTop = eventsLog.scrollHeight;
}

// Show Status
function showStatus(message, type) {
    connectionStatus.textContent = message;
    connectionStatus.className = `status ${type}`;
}

// Utility Functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Initialize
console.log('Chat Test Client Loaded');
console.log('Make sure your server is running and CORS is enabled!');
console.log('Login with your credentials to get a session cookie');
