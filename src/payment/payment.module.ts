import { forwardRef, Module } from '@nestjs/common';

import { PaymentController } from '@/payment/payment.controller';
import { RazorpayService } from '@/payment/razorpay.service';
import { RazorpayWebhookService } from '@/payment/razorpay-webhook.service';
import { CartModule } from '@/cart/cart.module';

@Module({
  imports: [forwardRef(() => CartModule)],
  controllers: [PaymentController],
  providers: [RazorpayService, RazorpayWebhookService],
  exports: [RazorpayService, RazorpayWebhookService],
})
export class PaymentModule {}
