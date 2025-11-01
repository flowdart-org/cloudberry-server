import { BadRequestException, Injectable } from '@nestjs/common';

import { SmsService } from '@/sms/sms.service';
import { OtpService } from '@/otp/otp.service';
import { OTPPurpose } from '@/otp/otp.interface';
import { UserService } from '@/user/user.service';
import { AdminService } from '@/admin/admin.service';
import { EmailService } from '@/email/email.service';
import { JwtService } from '@/auth/services/jwt.service';
import { AdminLoginDto } from '@/auth/dto/request/admin-login.dto';
import { isEmail, isPhone } from '@/auth/utils/identifier.util';
import { LoginVerifyOTPDto } from '@/auth/dto/request/verify-OTP.dto';
import { LoginRequestOTPDto } from '@/auth/dto/request/request-OTP.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _smsService: SmsService,
    private readonly _emailService: EmailService,
    private readonly _otpService: OtpService,
    private readonly _jwtService: JwtService,
    private readonly _userService: UserService,
    private readonly _adminService: AdminService,
  ) {}

  async requestOtp(dto: LoginRequestOTPDto) {
    const { identifier } = dto;

    if (isEmail(identifier)) {
      const { otp } = await this._otpService.generateOTP('LOGIN', identifier);
      // await this._emailService.sendEmail(
      //   identifier,
      //   'Your Login OTP',
      //   `Welcome to ZenFashionStudio! Your OTP is ${otp}. Do not share it with anyone.`,
      // );

      console.log('OTP sent to email:', identifier, '=>', otp);
    } else if (isPhone(identifier)) {
      const { otp } = await this._otpService.generateOTP('LOGIN', identifier);
      // await this._smsService.sendSMS(
      //   identifier,
      //   `Welcome to ZenFashionStudio! Your OTP is ${otp}. Do not share it with anyone.`,
      // );

      console.log('OTP sent to phone:', identifier, '=>', otp);
    } else {
      throw new BadRequestException('Invalid identifier format');
    }
  }

  async login(purpose: OTPPurpose, dto: LoginVerifyOTPDto) {
    const identifier = dto.identifier;
    const isEmailLogin = isEmail(identifier);
    const isPhoneLogin = isPhone(identifier);

    const OTPVerified = await this._otpService.verifyOTP(
      purpose,
      identifier,
      dto.otp,
    );

    if (!OTPVerified) {
      throw new BadRequestException('Invalid OTP');
    }

    let user = isEmailLogin
      ? await this._userService.findByEmail(identifier)
      : await this._userService.findByPhone(identifier);

    if (!user) {
      user = await this._userService.create({
        email: isEmailLogin ? identifier : undefined,
        phone: isPhoneLogin ? identifier : undefined,
      });
      if (!user) {
        throw new BadRequestException(`User not found and can't be created`);
      }
    }

    const accessToken = this._jwtService.generateAccessToken({
      sub: user.id,
      role: 'user',
    });

    const refreshToken = this._jwtService.generateRefreshToken({
      sub: user.id,
      role: 'user',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async adminLogin(dto: AdminLoginDto) {
    const admin = await this._adminService.findByEmail(dto.email);

    if (!admin || admin.password !== dto.password) {
      throw new BadRequestException('Invalid email or password');
    }

    const accessToken = this._jwtService.generateAccessToken({
      sub: admin.id,
      role: 'admin',
    });

    const refreshToken = this._jwtService.generateRefreshToken({
      sub: admin.id,
      role: 'admin',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshToken: string) {
    const payload = this._jwtService.verifyRefreshToken(refreshToken);
    const isAdmin = payload.role === 'admin';

    const user = isAdmin
      ? await this._adminService.findById(payload.sub)
      : await this._userService.findById(payload.sub);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const newAccessToken = this._jwtService.generateAccessToken({
      sub: user.id,
      role: payload.role,
    });

    const newRefreshToken = this._jwtService.generateRefreshToken({
      sub: user.id,
      role: payload.role,
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
