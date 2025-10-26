import { Module } from '@nestjs/common';

import { AuthController } from '@/auth/auth.controller';
import { SmsModule } from '@/sms/sms.module';
import { OtpModule } from '@/otp/otp.module';
import { AuthService } from '@/auth/services/auth.service';
import { JwtService } from '@/auth/services/jwt.service';

@Module({
  imports: [SmsModule, OtpModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [JwtService],
})
export class AuthModule {}
