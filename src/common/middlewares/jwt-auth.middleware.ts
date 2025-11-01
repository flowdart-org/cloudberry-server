import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@/auth/services/jwt.service';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly _jwtService: JwtService) {}

  use(req: Request, _res: Response, next: NextFunction) {
    const accessToken = req.cookies['access_token'] as string;

    if (!accessToken)
      throw new UnauthorizedException('Missing authorization header');

    req['user'] = this._jwtService.verifyAccessToken(accessToken);
    next();
  }
}
