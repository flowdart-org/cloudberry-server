import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SmsModule } from '@/sms/sms.module';

@Module({
  imports: [SmsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
