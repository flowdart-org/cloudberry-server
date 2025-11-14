import Razorpay from 'razorpay';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { Orders } from 'razorpay/dist/types/orders';
import { Injectable, BadRequestException } from '@nestjs/common';

interface VarifyPaymentParams {
  orderId: string;
  paymentId: string;
  signature: string;
}

@Injectable()
export class RazorpayService {
  private razorpay: Razorpay;

  constructor() {
    const configService = new ConfigService();

    const RAZORPAY_KEY_ID = configService.getOrThrow<string>('RAZORPAY_KEY_ID');
    const RAZORPAY_KEY_SECRET = configService.getOrThrow<string>(
      'RAZORPAY_KEY_SECRET',
    );

    this.razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });
  }

  async createOrder(amount: number, currency = 'INR', receipt?: string) {
    try {
      const options:
        | Orders.RazorpayOrderCreateRequestBody
        | Orders.RazorpayTransferCreateRequestBody
        | Orders.RazorpayAuthorizationCreateRequestBody = {
        amount: amount * 100,
        currency,
        receipt: receipt ?? `rcpt_${Date.now()}`,
      };

      const order = await this.razorpay.orders.create(options);
      return {
        id: order.id,
        currency: order.currency,
        amount: order.amount,
      };
    } catch (error) {
      throw new BadRequestException('Failed to create Razorpay order', error);
    }
  }

  async createPaymentLink(amount: number, email?: string, contact?: string) {
    try {
      const link = await this.razorpay.paymentLink.create({
        amount: amount * 100,
        currency: 'INR',
        description: 'Payment for your SnapCart order',
        customer: {
          name: 'rahil',
          contact,
          email,
        },
        notify: {
          sms: true,
          email: true,
        },
        reminder_enable: true,
        callback_url: 'http://cloudberrytryon.com/payment/success',
        callback_method: 'get',
      });

      return { paymentUrl: link.short_url };
    } catch (error) {
      throw new BadRequestException('Failed to create payment link', error);
    }
  }

  verifyPaymentSignature(data: VarifyPaymentParams): boolean {
    const { orderId, paymentId, signature } = data;

    const body = orderId + '|' + paymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex');

    return expectedSignature === signature;
  }
}
