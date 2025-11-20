// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
// import * as crypto from 'crypto';
// import { PrismaService } from '@app/common';

// export interface TokenPayload {
//   sub: string;
//   email: string;
//   role: string;
//   type: 'access' | 'refresh';
//   iat?: number;
//   exp?: number;
// }

// export interface TokenResponse {
//   access_token: string;
//   refresh_token: string;
//   token_type: string;
//   expires_in: number;
// }

// @Injectable()
// export class TokenService {
//   constructor(
//     private jwtService: JwtService,
//     private configService: ConfigService,
//     private prisma: PrismaService,
//   ) {}

//   async generateTokens(
//     userId: string,
//     email: string,
//     role?: string,
//   ): Promise<TokenResponse> {
//     // Get user role if not provided
//     let userRole = role;
//     if (!userRole) {
//       const user = await this.prisma.user.findUnique({
//         where: { id: userId },
//         select: { role: true },
//       });
//       userRole = user?.role || 'CUSTOMER';
//     }

//     const accessTokenPayload: TokenPayload = {
//       sub: userId,
//       email,
//       role: userRole,
//       type: 'access',
//     };

//     const refreshTokenPayload: TokenPayload = {
//       sub: userId,
//       email,
//       role: userRole,
//       type: 'refresh',
//     };

//     const accessToken = this.jwtService.sign(accessTokenPayload, {
//       expiresIn: '15m', // Short-lived access token
//     });

//     const refreshToken = this.jwtService.sign(refreshTokenPayload, {
//       expiresIn: '7d', // Long-lived refresh token
//       secret: this.configService.get('JWT_REFRESH_SECRET') || 'refresh-secret',
//     });

//     // Store refresh token in database
//     await this.storeRefreshToken(userId, refreshToken);

//     return {
//       access_token: accessToken,
//       refresh_token: refreshToken,
//       token_type: 'Bearer',
//       expires_in: 900, // 15 minutes in seconds
//     };
//   }

//   async refreshTokens(refreshToken: string): Promise<TokenResponse> {
//     try {
//       const payload = this.jwtService.verify(refreshToken, {
//         secret:
//           this.configService.get('JWT_REFRESH_SECRET') || 'refresh-secret',
//       }) as TokenPayload;

//       if (payload.type !== 'refresh') {
//         throw new Error('Invalid token type');
//       }

//       // Check if refresh token exists in database
//       const storedToken = await this.prisma.refreshToken.findFirst({
//         where: {
//           userId: payload.sub,
//           token: refreshToken,
//           expiresAt: { gt: new Date() },
//         },
//       });

//       if (!storedToken) {
//         throw new Error('Invalid refresh token');
//       }

//       // Get user details
//       const user = await this.prisma.user.findUnique({
//         where: { id: payload.sub },
//       });

//       if (!user) {
//         throw new Error('User not found');
//       }

//       // Revoke old refresh token
//       await this.revokeRefreshToken(refreshToken);

//       // Generate new tokens
//       return this.generateTokens(user.id, user.email!, user.role);
//     } catch (error) {
//       throw new Error('Invalid refresh token');
//     }
//   }

//   async revokeRefreshToken(refreshToken: string): Promise<void> {
//     await this.prisma.refreshToken.deleteMany({
//       where: { token: refreshToken },
//     });
//   }

//   async revokeAllUserTokens(userId: string): Promise<void> {
//     await this.prisma.refreshToken.deleteMany({
//       where: { userId },
//     });
//   }

//   private async storeRefreshToken(
//     userId: string,
//     token: string,
//   ): Promise<void> {
//     const expiresAt = new Date();
//     expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

//     await this.prisma.refreshToken.create({
//       data: {
//         userId,
//         token,
//         expiresAt,
//       },
//     });
//   }

//   generateVerificationToken(): string {
//     return crypto.randomBytes(32).toString('hex');
//   }

//   generateOTP(): string {
//     return Math.floor(100000 + Math.random() * 900000).toString();
//   }
// }
