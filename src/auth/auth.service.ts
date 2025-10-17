import { Injectable } from '@nestjs/common';
import { JWTPayload } from '@/common/types';
import { UserRegisterDto } from '@/auth/dto/user-register.dto';
import { SmsService } from '@/sms/sms.service';

@Injectable()
export class AuthService {
  constructor(private readonly _smsService: SmsService) {}

  async register(dto: UserRegisterDto) {
    await this._smsService.sendSMS(
      dto.phoneNumber,
      'Welcome to our ZenFashionStudio. ' +
        'Your OTP to verify your account is 000000. ' +
        "Don't share it with anyone!",
    );
  }

  verifyToken(token: string) {
    console.log(token);
    return { sub: '123', role: 'user' } as JWTPayload;
  }
}
