import { Module } from '@nestjs/common';

import { PaymentController } from '@/payment/payment.controller';
import { RazorpayService } from '@/payment/razorpay.service';

@Module({
  controllers: [PaymentController],
  providers: [RazorpayService],
})
export class PaymentModule {}
