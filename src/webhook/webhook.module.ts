import { Module } from '@nestjs/common';
import { RazorpayWebhookController } from '@/webhook/razorpay-webhook.controller';
import { PaymentModule } from '@/payment/payment.module';

@Module({
  imports: [PaymentModule],
  controllers: [RazorpayWebhookController],
})
export class WebhookModule {}
