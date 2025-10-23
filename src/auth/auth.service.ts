import { BadRequestException, Injectable } from '@nestjs/common';
import { JWTPayload } from '@/common/types';
import { SmsService } from '@/sms/sms.service';
import { OtpService } from '@/otp/otp.service';
import { LoginVerifyOTPDto } from '@/auth/dto/request/verify-OTP.dto';
import { OTPPurpose } from '@/otp/otp.interface';
import { LoginRequestOTPDto } from '@/auth/dto/request/request-OTP.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _smsService: SmsService,
    private readonly _otpService: OtpService,
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

    return {
      accessToken: 'access_token_example2',
      refreshToken: 'refresh_token_example2',
    };
  }

  verifyToken(token: string) {
    console.log(token);
    return { sub: '123', role: 'user' } as JWTPayload;
  }
}
