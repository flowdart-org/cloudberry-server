import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export function setAuthCookies(res: Response, tokens: ITokens) {
  const { accessToken, refreshToken } = tokens;

  const configService = new ConfigService();
  const isProduction =
    configService.getOrThrow<string>('NODE_ENV') === 'production';

  res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 1000 * 60 * 15,
    path: '/',
  });

  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7,
    path: '/',
  });
}

export function clearAuthCookies(res: Response) {
  res.clearCookie('access_token', { path: '/' });
  res.clearCookie('refresh_token', { path: '/' });
}
