import { Module } from '@nestjs/common';

import { OrderModule } from '@/order/order.module';
import { RazorpayService } from '@/payment/razorpay.service';
import { PaymentController } from '@/payment/payment.controller';
import { RazorpayWebhookService } from '@/payment/razorpay-webhook.service';

@Module({
  imports: [OrderModule],
  controllers: [PaymentController],
  providers: [RazorpayService, RazorpayWebhookService],
  exports: [RazorpayService, RazorpayWebhookService],
})
export class PaymentModule {}
