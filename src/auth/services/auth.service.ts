import { BadRequestException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { SmsService } from '@/sms/sms.service';
import { OtpService } from '@/otp/otp.service';
import { Role } from '@/common/enums/role.enum';
import { OTPPurpose } from '@/otp/otp.interface';
import { AdminService } from '@/admin/admin.service';
import { EmailService } from '@/email/email.service';
import { JwtService } from '@/auth/services/jwt.service';
import { UserService } from '@/user/services/user.service';
import { isEmail, isPhone } from '@/auth/utils/identifier.util';
import { AdminLoginDto } from '@/auth/dto/request/admin-login.dto';
import { LoginVerifyOTPDto } from '@/auth/dto/request/verify-OTP.dto';
import { LoginRequestOTPDto } from '@/auth/dto/request/request-OTP.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _smsService: SmsService,
    private readonly _otpService: OtpService,
    private readonly _jwtService: JwtService,
    private readonly _userService: UserService,
    private readonly _adminService: AdminService,
    private readonly _emailService: EmailService,
  ) {}

  async requestOtp(dto: LoginRequestOTPDto): Promise<void> {
    const { identifier } = dto;

    if (isEmail(identifier)) {
      const { otp } = await this._otpService.generateOTP('LOGIN', identifier);
      await this._emailService.sendEmail(
        identifier,
        'Your Login OTP',
        `Welcome to Cloudberry! Your OTP is ${otp}. Do not share it with anyone.`,
      );

      console.log('OTP sent to email:', identifier, '=>', otp);
    } else if (isPhone(identifier)) {
      const { otp } = await this._otpService.generateOTP('LOGIN', identifier);
      await this._smsService.sendSMS(
        identifier,
        `Welcome to Cloudberry! Your OTP is ${otp}. Do not share it with anyone.`,
      );

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
      role: Role.USER,
    });

    const refreshToken = this._jwtService.generateRefreshToken({
      sub: user.id,
      role: Role.USER,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async adminLogin(dto: AdminLoginDto) {
    const admin = await this._adminService.findByEmail(dto.email);

    if (!admin) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, admin.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    const accessToken = this._jwtService.generateAccessToken({
      sub: admin.id,
      role: Role.ADMIN,
    });

    const refreshToken = this._jwtService.generateRefreshToken({
      sub: admin.id,
      role: Role.ADMIN,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshToken: string) {
    const payload = this._jwtService.verifyRefreshToken(refreshToken);
    const isAdmin = payload.role === Role.ADMIN.toString();

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
