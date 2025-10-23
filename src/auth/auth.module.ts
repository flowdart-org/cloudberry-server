import { Module } from '@nestjs/common';

import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
import { SmsModule } from '@/sms/sms.module';
import { OtpModule } from '@/otp/otp.module';

@Module({
  imports: [SmsModule, OtpModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
