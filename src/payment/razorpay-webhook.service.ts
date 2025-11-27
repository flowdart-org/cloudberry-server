import { Injectable } from '@nestjs/common';

import {
  PaymentCapturedWebhook,
  PaymentFailedWebhook,
  RazorpayWebhookPayload,
} from '@/common/types/razorpay';
import { OrderService } from '@/order/order.service';

@Injectable()
export class RazorpayWebhookService {
  constructor(private readonly _orderService: OrderService) {}

  private async handlePaymentCaptured(event: PaymentCapturedWebhook) {
    const payment = event.payload.payment.entity;

    const { orderId, orderNumber } = payment.notes as {
      userId: string;
      orderId: string;
      orderNumber: string;
    };

    if (!orderId || !orderNumber) {
      console.warn('⚠️ Order details missing in payment notes');
      return;
    }

    console.log(
      `💰 Payment Captured: Order=${orderId}, Amount=${payment.amount} ${payment.currency}`,
    );

    await this._orderService.update(orderId, {
      paymentStatus: 'paid',
      orderStatus: 'processing',
    });
  }

  private handlePaymentFailed(event: PaymentFailedWebhook) {
    const payment = event.payload.payment.entity;

    const { orderNumber } = payment.notes as {
      userId: string;
      orderId: string;
      orderNumber: string;
    };

    console.log(
      `❌ Payment Failed: Order=${orderNumber}, Amount=${payment.amount} ${payment.currency}, Reason=${payment.error_description}`,
    );
  }

  async handleWebhook(payload: RazorpayWebhookPayload<any, unknown>) {
    switch (payload.event) {
      case 'payment.captured':
        await this.handlePaymentCaptured(payload as PaymentCapturedWebhook);
        break;
      case 'payment.failed':
        this.handlePaymentFailed(payload as PaymentFailedWebhook);
        break;
      default:
        console.log(`⚠️ Unhandled event type: ${payload.event}`);
    }

    return { status: 'ok' };
  }
}
