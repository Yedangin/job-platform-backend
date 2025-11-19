import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class Facebook0AuthGuard extends AuthGuard('facebook') {}
