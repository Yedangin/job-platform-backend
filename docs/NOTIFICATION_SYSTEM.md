# Notification System - Email & Real-time Push Notifications

## Overview

This document covers the email and real-time push notification system built for the Job Platform backend. The system supports two delivery channels:

- **Email Notifications** - Transactional emails sent via SMTP with Bull queue for reliability
- **Push Notifications** - Real-time WebSocket delivery via Socket.IO on the API Gateway

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    API Gateway (port 8000)                   │
│  ┌─────────────────┐  ┌──────────────────────────────────┐  │
│  │ NotificationCtrl │  │  NotificationGateway (WebSocket) │  │
│  │  REST endpoints  │  │  ws://localhost:8000/notifications│  │
│  └───────┬─────────┘  └──────────────┬───────────────────┘  │
│          │ gRPC                       │ Redis Subscribe      │
└──────────┼───────────────────────────┼──────────────────────┘
           │                           │
           ▼                           │
┌──────────────────────────────────────┼──────────────────────┐
│       Notification Service (gRPC port 8004)                  │
│  ┌──────────────┐  ┌─────────────┐  │  ┌────────────────┐  │
│  │  gRPC Handler │──│  Email Svc  │──┼──│  Bull Queue    │  │
│  │  (Controller) │  │ (@mailer)   │  │  │  (email-queue) │  │
│  └──────┬───────┘  └─────────────┘  │  └────────────────┘  │
│         │                           │                        │
│         │  Redis Publish ───────────┘                        │
│         ▼                                                    │
│  ┌──────────────┐                                            │
│  │  PostgreSQL   │                                           │
│  │ (Prisma ORM)  │                                           │
│  └──────────────┘                                            │
└──────────────────────────────────────────────────────────────┘
```

### Flow

1. A service (job, auth, etc.) calls `NotificationService.SendNotification` via gRPC
2. The notification service saves the record to PostgreSQL
3. If channel is `PUSH` or `BOTH`: publishes event to Redis channel `notification:{userId}`
4. If channel is `EMAIL` or `BOTH`: adds a job to the Bull `email-queue`
5. The API Gateway's WebSocket gateway subscribes to Redis `notification:*` pattern and pushes events to connected users
6. The Bull processor dequeues email jobs, sends via SMTP, and updates the DB status

---

## What Was Built

### New Files

| File | Purpose |
|------|---------|
| `proto/notification/notification.proto` | gRPC service definition (5 RPCs) |
| `libs/common/src/common/redis/redis-pubsub.service.ts` | Redis Pub/Sub service (publish, subscribe, psubscribe) |
| `apps/notification-service/src/main.ts` | Notification microservice bootstrap (gRPC on port 8004) |
| `apps/notification-service/src/notification-service.module.ts` | Root module with Mailer, Bull, Prisma, Redis |
| `apps/notification-service/src/notification-service.controller.ts` | gRPC method handlers |
| `apps/notification-service/src/notification-service.service.ts` | Core notification business logic |
| `apps/notification-service/src/email/email.module.ts` | MailerModule config with Handlebars |
| `apps/notification-service/src/email/email.service.ts` | Email sending logic |
| `apps/notification-service/src/email/templates/base-layout.hbs` | Base HTML email layout |
| `apps/notification-service/src/email/templates/application-alert.hbs` | Job application email |
| `apps/notification-service/src/email/templates/interview-update.hbs` | Interview notification email |
| `apps/notification-service/src/email/templates/email-verification.hbs` | Email verification |
| `apps/notification-service/src/email/templates/status-alert.hbs` | Generic status alert email |
| `apps/notification-service/src/queue/email.module.ts` | Bull queue module |
| `apps/notification-service/src/queue/email.processor.ts` | Email queue processor with retry logic |
| `apps/notification-service/src/redis-pub/redis-pub.module.ts` | Redis publisher module |
| `apps/notification-service/src/redis-pub/redis-pub.service.ts` | Redis publisher service |
| `apps/job-platform-backend/src/notification/notification.module.ts` | API Gateway notification module |
| `apps/job-platform-backend/src/notification/notification.controller.ts` | REST endpoints for notifications |
| `apps/job-platform-backend/src/notification/notification.gateway.ts` | WebSocket gateway (Socket.IO) |

### Modified Files

| File | Change |
|------|--------|
| `prisma/notification/notification.schema.prisma` | Added `SENT` status, `NotificationChannel` enum, `channel`, `readAt`, new indexes |
| `libs/common/src/common/redis/redis.module.ts` | Added `RedisPubSubService` to providers/exports |
| `libs/common/src/common/prisma/notification/notification-prisma.module.ts` | Renamed class `PrismaModule` → `NotificationPrismaModule` |
| `libs/common/src/index.ts` | Added exports for `RedisPubSubService` and `CurrentSession` decorator |
| `apps/job-platform-backend/src/app.module.ts` | Imported `NotificationModule` |
| `.env.example` | Added `NOTIFICATION_SERVICE_URL` |

### Dependencies Added

| Package | Purpose |
|---------|---------|
| `@nestjs-modules/mailer` | NestJS email module |
| `nodemailer` | SMTP email transport |
| `handlebars` | Email template engine |
| `@nestjs/websockets` | NestJS WebSocket support |
| `@nestjs/platform-socket.io` | Socket.IO adapter for NestJS |
| `socket.io` | Real-time communication library |
| `@nestjs/bullmq` | NestJS Bull queue module |
| `bullmq` | Redis-based job queue |
| `@types/nodemailer` | TypeScript types (dev) |

---

## Database Schema Changes

### New Enum: `NotificationChannel`

```
EMAIL  - Send email only
PUSH   - Send WebSocket push only
BOTH   - Send both email and push (default)
```

### Updated Enum: `NotificationStatus`

```
PENDING  - Awaiting processing
SENDING  - Email being sent
SENT     - Email sent successfully (NEW)
FAILED   - Email failed to send
```

### New Fields on `Notification` Model

- `channel` (NotificationChannel, default: BOTH)
- `readAt` (DateTime, nullable)

### New Indexes

- `@@index([userId])` - For fetching user notifications
- `@@index([status])` - For queue processing

---

## API Endpoints

### REST Endpoints (API Gateway - port 8000)

All endpoints require session authentication (cookie `sessionId`).

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/notifications` | Get paginated notifications for current user |
| `GET` | `/notifications/unread-count` | Get unread notification count |
| `PATCH` | `/notifications/:id/read` | Mark a single notification as read |
| `PATCH` | `/notifications/read-all` | Mark all notifications as read |

#### Query Parameters for `GET /notifications`

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | string | "1" | Page number |
| `limit` | string | "10" | Items per page |
| `notificationType` | string | - | Filter by type (APPLICATION_ALERT, INTERVIEW_UPDATE, etc.) |

### WebSocket Events (Socket.IO)

**Connection:** `ws://localhost:8000/notifications`

**Authentication:** Pass `sessionId` via:
- Cookie: `sessionId=<value>` (automatic if same origin)
- Auth object: `{ auth: { sessionId: '<value>' } }` (Socket.IO handshake)
- Header: `Authorization: Bearer <sessionId>`

#### Server → Client Events

| Event | Payload | Description |
|-------|---------|-------------|
| `new-notification` | `Notification` object | New notification received |
| `unread-count` | `{ count: number }` | Updated unread count |
| `notification-read` | `NotificationResponse` | Confirmation of read |
| `error` | `{ message: string }` | Error message |

#### Client → Server Events

| Event | Payload | Description |
|-------|---------|-------------|
| `mark-as-read` | `{ notificationId: string }` | Mark notification as read |
| `mark-all-read` | - | Mark all notifications as read |

### gRPC Service (port 8004)

| RPC Method | Request | Response |
|------------|---------|----------|
| `SendNotification` | `SendNotificationRequest` | `NotificationResponse` |
| `GetNotifications` | `GetNotificationsRequest` | `NotificationsListResponse` |
| `MarkAsRead` | `MarkAsReadRequest` | `NotificationResponse` |
| `MarkAllAsRead` | `MarkAllAsReadRequest` | `NotificationResponse` |
| `GetUnreadCount` | `GetUnreadCountRequest` | `UnreadCountResponse` |

---

## Notification Types

| Type | When to Use |
|------|-------------|
| `APPLICATION_ALERT` | Job application received/updated |
| `INTERVIEW_UPDATE` | Interview scheduled/rescheduled/cancelled |
| `REMINDER` | General reminders |
| `PROMOTION` | Promotional content, featured jobs |
| `EMAIL_VERIFICATION` | Email verification link |
| `FINANCIAL_ALERT` | Payment receipts, billing |
| `STATUS_ALERT` | Status changes (approved, rejected, etc.) |

---

## Environment Variables

Add these to your `.env` file:

```env
# Notification Service
NOTIFICATION_SERVICE_PORT=8004
NOTIFICATION_SERVICE_URL=localhost:8004

# Email (SMTP) - Using Mailtrap for development
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=your-mailtrap-username
MAIL_PASSWORD=your-mailtrap-password
MAIL_FROM=noreply@jobplatform.com
MAIL_SECURE=false

# Redis (required for Bull queue + Pub/Sub)
REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## How to Test

### Prerequisites

1. **PostgreSQL** running with notification database created
2. **Redis** running on localhost:6379
3. **Mailtrap account** (free) for email testing: https://mailtrap.io

### Step 1: Run Database Migration

```bash
# Generate Prisma client with new schema
npm run prisma:gen:notification

# Run migration (requires DB connection)
npm run prisma:migrate:notification
```

### Step 2: Start the Notification Service

```bash
# Start notification service (gRPC on port 8004)
npx nest start notification-service --watch
```

### Step 3: Start the API Gateway

```bash
# Start API gateway (HTTP on port 8000, WebSocket on /notifications)
npx nest start --watch
```

### Step 4: Test REST Endpoints

```bash
# Get notifications (requires valid session cookie)
curl -b "sessionId=YOUR_SESSION_ID" http://localhost:8000/notifications

# Get unread count
curl -b "sessionId=YOUR_SESSION_ID" http://localhost:8000/notifications/unread-count

# Mark as read
curl -X PATCH -b "sessionId=YOUR_SESSION_ID" http://localhost:8000/notifications/NOTIFICATION_ID/read

# Mark all as read
curl -X PATCH -b "sessionId=YOUR_SESSION_ID" http://localhost:8000/notifications/read-all
```

### Step 5: Test WebSocket Connection

Using a Socket.IO client (browser or Node.js):

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000/notifications', {
  auth: { sessionId: 'YOUR_SESSION_ID' },
  // OR use withCredentials for cookie-based auth:
  // withCredentials: true,
});

socket.on('connect', () => {
  console.log('Connected to notifications');
});

socket.on('new-notification', (notification) => {
  console.log('New notification:', notification);
});

socket.on('unread-count', (data) => {
  console.log('Unread count:', data.count);
});

// Mark a notification as read
socket.emit('mark-as-read', { notificationId: 'some-id' });

// Mark all as read
socket.emit('mark-all-read');
```

### Step 6: Test Sending a Notification (gRPC)

From another service or a test script, call the gRPC method:

```typescript
// Example: triggering from job-service after a new application
this.notificationClient.getService('NotificationService').SendNotification({
  userId: 'employer-user-id',
  email: 'employer@example.com',
  subject: 'New Job Application',
  content: 'John Doe applied for Software Engineer position',
  notificationType: 'APPLICATION_ALERT',
  channel: 'BOTH',
  relatedJobPostId: 'job-123',
  metadata: JSON.stringify({ applicantName: 'John Doe', jobTitle: 'Software Engineer' }),
});
```

### Step 7: Verify Email Delivery

1. Log in to [Mailtrap](https://mailtrap.io)
2. Check your inbox for the sent email
3. Verify the HTML template renders correctly

### Step 8: Verify Bull Queue

Check Redis for Bull queue keys:

```bash
redis-cli KEYS "bull:email-queue:*"
```

### Step 9: Check Swagger Docs

Open `http://localhost:8000/api-docs` to see the notification endpoints in Swagger UI.

---

## Triggering Notifications from Other Services

### Example: Job Application Created

In `apps/job-service/src/apply/apply.service.ts`, after creating an application:

```typescript
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { NOTIFICATION_PACKAGE_NAME, NotificationServiceClient } from 'types/notification/notification';

// In constructor:
@Inject(NOTIFICATION_PACKAGE_NAME) private notificationClient: ClientGrpc

// In onModuleInit:
this.notificationService = this.notificationClient.getService<NotificationServiceClient>('NotificationService');

// After creating application:
this.notificationService.sendNotification({
  userId: employerId,
  email: employerEmail,
  subject: 'New Job Application Received',
  content: `${applicantName} has applied for ${jobTitle}`,
  notificationType: 'APPLICATION_ALERT' as any,
  channel: 'BOTH' as any,
  relatedJobPostId: jobId,
});
```

### Example: Interview Scheduled

```typescript
this.notificationService.sendNotification({
  userId: applicantId,
  email: applicantEmail,
  subject: 'Interview Scheduled',
  content: `Your interview for ${jobTitle} is scheduled`,
  notificationType: 'INTERVIEW_UPDATE' as any,
  channel: 'BOTH' as any,
  relatedInterviewId: interviewId,
  relatedJobPostId: jobId,
  metadata: JSON.stringify({
    interviewDate: '2026-02-15',
    interviewTime: '10:00 AM',
    interviewLocation: 'Seoul Office',
    interviewMethod: 'OFFLINE',
  }),
});
```

---

## Email Queue Configuration

The Bull queue is configured with:

- **Max retry attempts:** 3
- **Backoff strategy:** Exponential (5s, 10s, 20s)
- **Completed jobs:** Auto-removed
- **Failed jobs:** Kept for debugging

The processor updates the notification status in the database:
- `PENDING` → `SENDING` → `SENT` (success)
- `PENDING` → `SENDING` → `FAILED` (after all retries exhausted)
