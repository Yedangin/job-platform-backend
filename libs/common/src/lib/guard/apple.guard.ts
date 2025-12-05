import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class Apple0AuthGuard extends AuthGuard('apple') {}
