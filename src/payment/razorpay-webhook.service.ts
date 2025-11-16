import { Injectable } from '@nestjs/common';
import {
  PaymentCapturedWebhook,
  PaymentFailedWebhook,
  RazorpayWebhookPayload,
} from '@/common/types/razorpay';

import { CartService } from '@/cart/cart.service';

@Injectable()
export class RazorpayWebhookService {
  constructor(private readonly _cartService: CartService) {}

  private handlePaymentCaptured(event: PaymentCapturedWebhook) {
    const payment = event.payload.payment.entity;

    const { userId } = payment.notes;

    console.log(
      `💰 Payment Captured: User=${userId}, Amount=${payment.amount} ${payment.currency}`,
    );
    // Add your business logic here, e.g., update order status, notify user, etc.
  }

  private handlePaymentFailed(event: PaymentFailedWebhook) {
    const payment = event.payload.payment.entity;

    const { userId } = payment.notes;

    console.log(
      `❌ Payment Failed: User=${userId}, Amount=${payment.amount} ${payment.currency}, Reason=${payment.error_description}`,
    );

    // Add your business logic here, e.g., update order status, notify user, etc.
  }

  handleWebhook(payload: RazorpayWebhookPayload<any, unknown>) {
    console.log('✔️ Webhook Verified Successfully');

    switch (payload.event) {
      case 'payment.captured':
        this.handlePaymentCaptured(payload as PaymentCapturedWebhook);
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
