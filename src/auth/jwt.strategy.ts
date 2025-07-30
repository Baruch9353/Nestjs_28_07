import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
// JWT authentication strategy using Bearer token from Authorization header
export class JwtStrategy extends PassportStrategy(Strategy) {
  // Injects config service and sets JWT extraction and secret
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // Validates the JWT payload and attaches user data to request
  async validate(payload: any) {
    return {
      id: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
