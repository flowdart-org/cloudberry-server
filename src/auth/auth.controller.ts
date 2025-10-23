import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { Response } from 'express';

import { AuthService } from '@/auth/auth.service';
import { HTTP_RESPONSE } from '@/common/types';
import { LoginVerifyOTPDto } from '@/auth/dto/request/verify-OTP.dto';
import { LoginRequestOTPDto } from '@/auth/dto/request/request-OTP.dto';
import { LoginResendOTPDto } from '@/auth/dto/request/resend-OTP.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login/request-otp')
  @ApiOperation({ summary: 'Register a new user' })
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
  @ApiResponse({ status: 200, description: 'OTP verified' })
  async verifyOtp(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginVerifyOTPDto,
  ): Promise<HTTP_RESPONSE> {
    const { accessToken, refreshToken } = await this._authService.verifyOTP(
      'LOGIN',
      dto,
    );

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 15,
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return { success: true, message: 'OTP verified' };
  }
}
