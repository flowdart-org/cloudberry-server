import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '@/common/types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.accessSecret =
      this.configService.getOrThrow<string>('JWT_ACCESS_SECRET');
    this.refreshSecret =
      this.configService.getOrThrow<string>('JWT_REFRESH_SECRET');
  }

  generateAccessToken(payload: JWTPayload): string {
    return jwt.sign(payload, this.accessSecret, {
      expiresIn: '15m',
    });
  }

  generateRefreshToken(payload: JWTPayload): string {
    return jwt.sign(payload, this.refreshSecret, { expiresIn: '7d' });
  }

  verifyAccessToken(token: string): JWTPayload {
    return jwt.verify(token, this.accessSecret) as JWTPayload;
  }

  verifyRefreshToken(token: string): JWTPayload {
    return jwt.verify(token, this.refreshSecret) as JWTPayload;
  }
}
