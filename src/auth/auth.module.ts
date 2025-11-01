import { forwardRef, Global, Module } from '@nestjs/common';

import { AuthController } from '@/auth/auth.controller';
import { SmsModule } from '@/sms/sms.module';
import { OtpModule } from '@/otp/otp.module';
import { AuthService } from '@/auth/services/auth.service';
import { JwtService } from '@/auth/services/jwt.service';
import { AdminModule } from '@/admin/admin.module';
import { UserModule } from '@/user/user.module';
import { EmailModule } from '@/email/email.module';

@Global()
@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AdminModule),
    SmsModule,
    EmailModule,
    OtpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [JwtService],
})
export class AuthModule {}
