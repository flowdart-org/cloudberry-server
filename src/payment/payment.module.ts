import { Module } from '@nestjs/common';

import { OrderModule } from '@/order/order.module';
import { RazorpayService } from '@/payment/services/razorpay.service';
import { PaymentController } from '@/payment/controllers/payment.controller';
import { RazorpayWebhookService } from '@/payment/services/razorpay-webhook.service';

@Module({
  imports: [OrderModule],
  controllers: [PaymentController],
  providers: [RazorpayService, RazorpayWebhookService],
  exports: [RazorpayService, RazorpayWebhookService],
})
export class PaymentModule {}
