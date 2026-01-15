import { Module } from '@nestjs/common';
import { GenerateStoreToken, RedisService, TokenService } from '@in-job/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'auth-service-queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, RedisService, GenerateStoreToken, TokenService],
})
export class AuthModule {}
