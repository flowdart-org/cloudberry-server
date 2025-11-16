import { Controller, Post, Body } from '@nestjs/common';

import { RazorpayService } from '@/payment/razorpay.service';
import { VarifyPaymentDto } from '@/payment/dto/request/verify-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly _razorpayService: RazorpayService) {}

  @Post('verify')
  verifyPayment(@Body() body: VarifyPaymentDto) {
    const isValid = this._razorpayService.verifyPaymentSignature({
      orderId: body.razorpay_order_id,
      paymentId: body.razorpay_payment_id,
      signature: body.razorpay_signature,
    });

    return { success: isValid };
  }
}
