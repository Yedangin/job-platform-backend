# Auth Service - gRPC Microservice

A complete authentication microservice built with NestJS, gRPC, JWT, Redis, and PostgreSQL.

## Features

- **User Registration**: Create new user accounts with email and password
- **User Login**: Authenticate users and generate JWT tokens
- **Session Management**: Redis-based session storage with JWT tokens
- **Get Profile**: Retrieve authenticated user profile
- **Logout**: Invalidate user sessions
- **Cookie-based Authentication**: Secure HttpOnly cookies for session management

## Architecture

### Token Strategy
- **Access Token**: Short-lived (15 minutes) JWT for API access
- **Refresh Token**: Long-lived (7 days) JWT for token renewal
- **Session ID**: JWT-based session identifier stored as HttpOnly cookie

### Redis Storage
All three tokens are stored in Redis with the session ID as the key:
```
session:{sessionId} -> {
  userId: string,
  email: string,
  role: string,
  accessToken: string,
  refreshToken: string
}
```

### Security Features
- Passwords hashed with bcrypt (10 rounds)
- HttpOnly, Secure, SameSite cookies
- JWT-based session IDs for additional security
- 7-day session expiration

## API Endpoints (gRPC)

### 1. Register
```protobuf
rpc Register(RegisterRequest) returns (Success);
```

**Request:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "MEMBER" // Optional: GUEST, MEMBER, CORPORATE, ADMIN, SUPERADMIN
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully"
}
```

### 2. Login
```protobuf
rpc Login(LoginRequest) returns (Success);
```

**Request:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful"
}
```

**Cookies Set:**
- `sessionId`: HttpOnly, Secure, 7-day expiration

### 3. GetProfile
```protobuf
rpc GetProfile(GetProfileRequest) returns (UserResponse);
```

**Request:**
- Requires `sessionId` cookie in metadata

**Response:**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "user": {
    "id": "clx123...",
    "role": "MEMBER",
    "email": "john@example.com",
    "fullName": "John Doe",
    "status": "ACTIVE",
    "isEmailedVerified": false,
    "isPhoneVerified": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 4. Logout
```protobuf
rpc Logout(LogoutRequest) returns (Success);
```

**Request:**
- Requires `sessionId` cookie in metadata

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

**Cookies Cleared:**
- `sessionId` cookie is removed

## Environment Variables

```env
# Database
USER_DATABASE_URL=postgres://postgres:admin@localhost:5432/users

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-jwt-key-here

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Service Port
AUTH_SERVICE_PORT=8001
```

## Running the Service

```bash
# Development
npm run start:dev auth-service

# Production
npm run build
npm run start:prod
```

## Testing with gRPC Client

You can test the service using tools like:
- **grpcurl**: Command-line gRPC client
- **BloomRPC**: GUI gRPC client
- **Postman**: Supports gRPC requests

Example with grpcurl:
```bash
# Register
grpcurl -plaintext -d '{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}' localhost:8001 auth.AuthService/Register

# Login
grpcurl -plaintext -d '{
  "email": "john@example.com",
  "password": "password123"
}' localhost:8001 auth.AuthService/Login
```

## Integration with API Gateway

The API Gateway should:
1. Forward cookies from HTTP requests to gRPC metadata
2. Convert gRPC metadata responses back to HTTP cookies
3. Handle cookie parsing and serialization

Example gateway implementation:
```typescript
// Forward cookies to gRPC
const metadata = new Metadata();
metadata.set('cookie', req.headers.cookie || '');

// Handle response cookies
call.on('metadata', (metadata) => {
  const setCookie = metadata.get('set-cookie');
  if (setCookie) {
    res.setHeader('Set-Cookie', setCookie);
  }
});
```

## Database Schema

Uses Prisma with PostgreSQL. The User model includes:
- Basic info: id, email, password, fullName, phone
- Status: role, status, verification flags
- Timestamps: createdAt, updatedAt

Run migrations:
```bash
npm run prisma:migrate:user
npm run prisma:gen:user
```

## Error Handling

All errors are returned as gRPC exceptions with appropriate status codes:
- `401 Unauthorized`: Invalid credentials or session
- `404 Not Found`: User not found
- `409 Conflict`: User already exists
- `500 Internal Server Error`: Unexpected errors
