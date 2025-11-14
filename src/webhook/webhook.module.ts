import { Module } from '@nestjs/common';
import { RazorpayWebhookController } from '@/webhook/razorpay-webhook.controller';

@Module({
  controllers: [RazorpayWebhookController],
})
export class WebhookModule {}
