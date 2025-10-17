import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './common/config/config.module';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [ConfigModule, AuthModule, SmsModule],
})
export class AppModule {}
