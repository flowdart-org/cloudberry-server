import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { ConfigModule } from '@/common/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule {}
