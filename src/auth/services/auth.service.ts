import { BadRequestException, Injectable } from '@nestjs/common';

import { LoginVerifyOTPDto } from '@/auth/dto/request/verify-OTP.dto';
import { LoginRequestOTPDto } from '@/auth/dto/request/request-OTP.dto';
import { JwtService } from '@/auth/services/jwt.service';
import { SmsService } from '@/sms/sms.service';
import { OtpService } from '@/otp/otp.service';
import { OTPPurpose } from '@/otp/otp.interface';
import { AdminLoginDto } from '@/auth/dto/request/admin-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _smsService: SmsService,
    private readonly _otpService: OtpService,
    private readonly _jwtService: JwtService,
  ) {}

  async requestOtp(dto: LoginRequestOTPDto) {
    const { otp } = await this._otpService.generateOTP('LOGIN', dto.phone);

    await this._smsService.sendSMS(
      dto.phone,
      'Welcome to our ZenFashionStudio. ' +
        `Your OTP to verify your account is ${otp}. ` +
        "Don't share it with anyone!",
    );
  }

  async resendOtp(phoneNumber: string) {
    const { otp } = await this._otpService.generateOTP('LOGIN', phoneNumber);

    await this._smsService.sendSMS(
      phoneNumber,
      'Welcome to our ZenFashionStudio. ' +
        `Your OTP to verify your account is ${otp}. ` +
        "Don't share it with anyone!",
    );
  }

  async verifyOTP(purpose: OTPPurpose, dto: LoginVerifyOTPDto) {
    const OTPVerified = await this._otpService.verifyOTP(
      purpose,
      dto.phone,
      dto.otp,
    );

    if (!OTPVerified) {
      throw new BadRequestException('Invalid OTP');
    }

    const accessToken = this._jwtService.generateAccessToken({
      sub: 'user_id_example',
      role: 'user',
    });

    const refreshToken = this._jwtService.generateRefreshToken({
      sub: 'user_id_example',
      role: 'user',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async adminLogin(dto: AdminLoginDto) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    console.log(`Admin login attempt: ${dto.email}`);
    console.log(`Password provided: ${dto.password}`);

    const accessToken = this._jwtService.generateAccessToken({
      sub: 'admin_id_example',
      role: 'admin',
    });

    const refreshToken = this._jwtService.generateRefreshToken({
      sub: 'admin_id_example',
      role: 'admin',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshToken: string) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const payload = this._jwtService.verifyRefreshToken(refreshToken);

    const newAccessToken = this._jwtService.generateAccessToken({
      sub: payload.sub,
      role: payload.role,
    });

    const newRefreshToken = this._jwtService.generateRefreshToken({
      sub: payload.sub,
      role: payload.role,
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
