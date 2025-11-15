import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import type { HTTP_RESPONSE } from '@/common/types';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import {
  clearAuthCookies,
  setAuthCookies,
} from '@/auth/utils/token-cookie.util';
import { AuthService } from '@/auth/services/auth.service';
import { Public } from '@/common/decorators/public.decorator';
import { AdminLoginDto } from '@/auth/dto/request/admin-login.dto';
import { LoginVerifyOTPDto } from '@/auth/dto/request/verify-OTP.dto';
import { LoginRequestOTPDto } from '@/auth/dto/request/request-OTP.dto';
import { ApiResponseWithType } from '@/common/decorators/api-response.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Public()
  @Post('login/request-otp')
  @ApiOperation({ summary: 'Request OTP for user.' })
  @ApiResponseWithType({
    status: 201,
    description: 'OTP has successfully sent.',
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  async requestOtp(@Body() dto: LoginRequestOTPDto): Promise<HTTP_RESPONSE> {
    await this._authService.requestOtp(dto);

    return {
      message: 'OTP has successfully sent.',
      success: true,
    };
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Verify the OTP of the user.' })
  @ApiResponse({ status: 200, description: 'OTP verified' })
  async verifyOtp(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginVerifyOTPDto,
  ): Promise<HTTP_RESPONSE> {
    const { accessToken, refreshToken } = await this._authService.login(
      'LOGIN',
      dto,
    );

    setAuthCookies(res, { accessToken, refreshToken });

    return { success: true, message: 'OTP verified', accessToken };
  }

  @Public()
  @Post('/admin/login')
  @ApiOperation({ summary: 'Admin login with email and password.' })
  @ApiResponseWithType()
  async adminLogin(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: AdminLoginDto,
  ): Promise<HTTP_RESPONSE> {
    const { accessToken, refreshToken } =
      await this._authService.adminLogin(dto);

    setAuthCookies(res, { accessToken, refreshToken });

    return {
      success: true,
      message: 'Admin logged in successfully',
      accessToken,
    };
  }

  @Public()
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

    return {
      success: true,
      message: 'Tokens refreshed successfully',
      accessToken,
    };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user removes token from cookies.' })
  @ApiResponse({ status: 200, description: 'User logged out successfully' })
  logout(@Res({ passthrough: true }) res: Response): HTTP_RESPONSE {
    clearAuthCookies(res);

    return { success: true, message: 'User logged out successfully' };
  }
}
