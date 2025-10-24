import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@/auth/services/jwt.service';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly _authService: JwtService) {}

  use(req: Request, _res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer '))
      throw new UnauthorizedException('Missing authorization header');

    const token = authHeader.split(' ')[1];
    req['user'] = this._authService.verifyAccessToken(token);
    next();
  }
}
