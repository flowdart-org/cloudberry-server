import {
  Controller,
  Post,
  Body,
  Res,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { HTTP_RESPONSE } from '@/common/types';
import type { Request, Response } from 'express';

import { AuthService } from '@/auth/services/auth.service';
import { LoginVerifyOTPDto } from '@/auth/dto/request/verify-OTP.dto';
import { LoginRequestOTPDto } from '@/auth/dto/request/request-OTP.dto';
import { LoginResendOTPDto } from '@/auth/dto/request/resend-OTP.dto';
import {
  clearAuthCookies,
  setAuthCookies,
} from '@/auth/utils/token-cookie.util';
import { AdminLoginDto } from '@/auth/dto/request/admin-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login/request-otp')
  @ApiOperation({ summary: 'Request OTP for user.' })
  @ApiResponse({ status: 201, description: 'OTP has successfully sent.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  async register(@Body() dto: LoginRequestOTPDto): Promise<HTTP_RESPONSE> {
    await this._authService.requestOtp(dto);

    return {
      message: 'OTP has successfully sent.',
      success: true,
    };
  }

  @Post('login/resend-otp')
  @ApiOperation({ summary: 'Resend OTP to user' })
  @ApiResponse({ status: 200, description: 'OTP has been resent.' })
  async resendOtp(@Body() dto: LoginResendOTPDto): Promise<HTTP_RESPONSE> {
    await this._authService.resendOtp(dto.phone);

    return {
      message: 'OTP has been resent.',
      success: true,
    };
  }

  @Post('login/verify-otp')
  @ApiOperation({ summary: 'Verify the OTP of the user.' })
  @ApiResponse({ status: 200, description: 'OTP verified' })
  async verifyOtp(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginVerifyOTPDto,
  ): Promise<HTTP_RESPONSE> {
    const { accessToken, refreshToken } = await this._authService.verifyOTP(
      'LOGIN',
      dto,
    );

    setAuthCookies(res, { accessToken, refreshToken });

    return { success: true, message: 'OTP verified' };
  }

  @Post('/admin/login')
  @ApiOperation({ summary: 'Admin login with email and password.' })
  @ApiResponse({ status: 200, description: 'Admin logged in successfully' })
  async adminLogin(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: AdminLoginDto,
  ): Promise<HTTP_RESPONSE> {
    const { accessToken, refreshToken } =
      await this._authService.adminLogin(dto);

    setAuthCookies(res, { accessToken, refreshToken });

    return { success: true, message: 'Admin logged in successfully' };
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh access and refresh tokens.' })
  @ApiResponse({ status: 200, description: 'Tokens refreshed successfully' })
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<HTTP_RESPONSE> {
    const refreshToken = req.cookies['refresh_token'] as string;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this._authService.refreshTokens(refreshToken);

    setAuthCookies(res, {
      accessToken: accessToken,
      refreshToken: newRefreshToken,
    });

    return { success: true, message: 'Tokens refreshed successfully' };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user removes token from cookies.' })
  @ApiResponse({ status: 200, description: 'User logged out successfully' })
  logout(@Res({ passthrough: true }) res: Response): HTTP_RESPONSE {
    clearAuthCookies(res);

    return { success: true, message: 'User logged out successfully' };
  }
}
