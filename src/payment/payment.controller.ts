import { Controller, Post, Body } from '@nestjs/common';

import { RazorpayService } from '@/payment/razorpay.service';
import { CreateOrderDto } from '@/payment/dto/request/create-order.dto';
import { VarifyPaymentDto } from '@/payment/dto/request/verify-payment.dto';
import { Public } from '@/common/decorators/public.decorator';

@Controller('payment')
export class PaymentController {
  constructor(private readonly _razorpayService: RazorpayService) {}

  @Public()
  @Post('create-order')
  async createOrder(@Body() dto: CreateOrderDto) {
    return this._razorpayService.createOrder(dto.amount);
  }

  @Public()
  @Post('create-order-link')
  async createOrderLink(@Body() dto: CreateOrderDto) {
    return this._razorpayService.createPaymentLink(dto.amount);
  }

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
