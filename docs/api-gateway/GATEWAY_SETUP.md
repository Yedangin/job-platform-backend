# API Gateway - Auth Integration Setup

## Current Status

✅ **Fixed:** Dependency injection error - Changed from `AUTH_PACKAGE_NAME` to `'AUTH_SERVICE'`
✅ **Added:** gRPC service URL configuration
✅ **Created:** Basic gateway controller with all 4 endpoints

## Architecture

```
HTTP Client → API Gateway (job-platform-backend) → gRPC → Auth Service
            (Port 8000)                                    (Port 8001)
```

## Files Structure

```
apps/job-platform-backend/src/auth/
├── auth.module.ts              # Module with gRPC client config
├── auth.controller.ts          # HTTP endpoints
├── dto/
│   ├── login.dto.ts           # Login request DTO
│   └── register.dto.ts        # Register request DTO
└── GATEWAY_SETUP.md           # This file
```

## Current Implementation

### 1. Auth Module (`auth.module.ts`)

```typescript
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(process.cwd(), 'proto/auth/auth.proto'),
          url: process.env.AUTH_SERVICE_URL || 'localhost:8001',
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [],
})
```

### 2. Auth Controller (`auth.controller.ts`)

Provides 4 HTTP endpoints:
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get user profile
- `POST /auth/logout` - Logout user

## Cookie Handling Limitation

⚠️ **Important:** NestJS's built-in gRPC client (`ClientGrpc`) doesn't support custom metadata (cookies) out of the box when using Observables.

### Current Behavior
- ✅ Basic request/response works
- ❌ Cookies are NOT forwarded to gRPC service
- ❌ Cookies from gRPC service are NOT set in HTTP response

### Solutions

#### Option 1: Use Raw gRPC Client (Recommended)

Create a custom gRPC client that supports metadata:

```typescript
// auth.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { join } from 'path';

@Injectable()
export class AuthGrpcService implements OnModuleInit {
  private client: any;

  async onModuleInit() {
    const packageDefinition = protoLoader.loadSync(
      join(process.cwd(), 'proto/auth/auth.proto'),
      {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      },
    );

    const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
    const authProto = protoDescriptor.auth as any;

    this.client = new authProto.AuthService(
      process.env.AUTH_SERVICE_URL || 'localhost:8001',
      grpc.credentials.createInsecure(),
    );
  }

  async login(loginDto: any, cookies?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const metadata = new grpc.Metadata();
      if (cookies) {
        metadata.set('cookie', cookies);
      }

      this.client.login(loginDto, metadata, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          // Extract cookies from metadata
          const setCookie = metadata.get('set-cookie');
          resolve({ response, setCookie });
        }
      });
    });
  }

  // Similar methods for register, getProfile, logout
}
```

#### Option 2: Use HTTP-to-HTTP Communication

Instead of gRPC between gateway and auth service, use HTTP:
- Gateway: HTTP REST API
- Auth Service: Also expose HTTP REST API alongside gRPC
- Easier cookie handling
- More overhead

#### Option 3: Session Management in Gateway

Store sessions in the gateway instead of the auth service:
- Auth service only validates credentials
- Gateway manages sessions and cookies
- Simpler architecture
- Gateway becomes stateful

## Recommended Approach

For your use case, I recommend **Option 1** (Raw gRPC Client) because:
1. ✅ Maintains microservice architecture
2. ✅ Supports cookie forwarding
3. ✅ Full control over metadata
4. ✅ Better performance than HTTP

## Implementation Steps

### Step 1: Install Dependencies

```bash
npm install @grpc/grpc-js @grpc/proto-loader
```

### Step 2: Create Auth gRPC Service

Create `apps/job-platform-backend/src/auth/auth-grpc.service.ts`:

```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { join } from 'path';

@Injectable()
export class AuthGrpcService implements OnModuleInit {
  private client: any;

  async onModuleInit() {
    const packageDefinition = protoLoader.loadSync(
      join(process.cwd(), 'proto/auth/auth.proto'),
      {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      },
    );

    const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
    const authProto = protoDescriptor.auth as any;

    this.client = new authProto.AuthService(
      process.env.AUTH_SERVICE_URL || 'localhost:8001',
      grpc.credentials.createInsecure(),
    );
  }

  register(registerDto: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.Register(registerDto, (error: any, response: any) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
  }

  login(loginDto: any, cookies?: string): Promise<{ response: any; cookies?: string[] }> {
    return new Promise((resolve, reject) => {
      const metadata = new grpc.Metadata();
      if (cookies) {
        metadata.set('cookie', cookies);
      }

      const call = this.client.Login(loginDto, metadata, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve({ response, cookies: [] });
        }
      });

      // Listen for metadata
      call.on('metadata', (responseMetadata: grpc.Metadata) => {
        const setCookie = responseMetadata.get('set-cookie');
        resolve({ response: null, cookies: setCookie as string[] });
      });
    });
  }

  getProfile(cookies: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const metadata = new grpc.Metadata();
      metadata.set('cookie', cookies);

      this.client.GetProfile({}, metadata, (error: any, response: any) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
  }

  logout(cookies: string): Promise<{ response: any; cookies?: string[] }> {
    return new Promise((resolve, reject) => {
      const metadata = new grpc.Metadata();
      metadata.set('cookie', cookies);

      const call = this.client.Logout({}, metadata, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve({ response, cookies: [] });
        }
      });

      // Listen for metadata
      call.on('metadata', (responseMetadata: grpc.Metadata) => {
        const setCookie = responseMetadata.get('set-cookie');
        resolve({ response: null, cookies: setCookie as string[] });
      });
    });
  }
}
```

### Step 3: Update Auth Module

```typescript
@Module({
  controllers: [AuthController],
  providers: [AuthGrpcService],
})
export class AuthModule {}
```

### Step 4: Update Auth Controller

```typescript
@Controller('auth')
export class AuthController {
  constructor(private readonly authGrpcService: AuthGrpcService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { response, cookies } = await this.authGrpcService.login(
      loginDto,
      req.headers.cookie,
    );

    if (cookies && cookies.length > 0) {
      res.setHeader('Set-Cookie', cookies);
    }

    return response;
  }

  // Similar for other endpoints
}
```

## Testing

### 1. Start Auth Service
```bash
npm run start:dev auth-service
```

### 2. Start API Gateway
```bash
npm run start:dev job-platform-backend
```

### 3. Test Register
```bash
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 4. Test Login
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }' \
  -c cookies.txt
```

### 5. Test Get Profile
```bash
curl -X GET http://localhost:8000/auth/profile \
  -b cookies.txt
```

### 6. Test Logout
```bash
curl -X POST http://localhost:8000/auth/logout \
  -b cookies.txt
```

## Current Limitations

1. **No Cookie Forwarding**: The current implementation doesn't forward cookies between HTTP and gRPC
2. **No Session Validation**: Profile and logout endpoints don't validate sessions yet
3. **Error Handling**: Basic error handling, needs improvement
4. **No Rate Limiting**: Should add rate limiting for auth endpoints
5. **No CORS**: Need to configure CORS for frontend integration

## Next Steps

1. ✅ Fix dependency injection (DONE)
2. ⏳ Implement raw gRPC client for cookie support
3. ⏳ Add proper error handling
4. ⏳ Add request validation
5. ⏳ Add rate limiting
6. ⏳ Configure CORS
7. ⏳ Add API documentation (Swagger)
8. ⏳ Add integration tests

## Environment Variables

Add to `.env`:
```env
AUTH_SERVICE_URL=localhost:8001
```

## Troubleshooting

### Error: "Nest can't resolve dependencies"
✅ **Fixed** - Changed injection token from `AUTH_PACKAGE_NAME` to `'AUTH_SERVICE'`

### Error: "Cannot connect to auth service"
- Make sure auth service is running on port 8001
- Check `AUTH_SERVICE_URL` in `.env`
- Verify proto file path is correct

### Cookies not working
- Current implementation doesn't support cookies yet
- Need to implement raw gRPC client (see Option 1 above)
