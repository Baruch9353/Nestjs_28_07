import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// Protects routes using the JWT strategy (Bearer token)
export class JwtAuthGuard extends AuthGuard('jwt') {}
