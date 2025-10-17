import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@/auth/auth.service';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly _authService: AuthService) {}

  use(req: Request, _res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer '))
      throw new UnauthorizedException('Missing authorization header');

    const token = authHeader.split(' ')[1];
    req['user'] = this._authService.verifyToken(token);
    next();
  }
}
