import {
  Controller,
  Post,
  Headers,
  BadRequestException,
  Req,
} from '@nestjs/common';
import crypto from 'crypto';
import type { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiExcludeController } from '@nestjs/swagger';

import { Public } from '@/common/decorators/public.decorator';
import { RawBody } from '@/common/decorators/raw-body.decorator';

@Controller('webhook/razorpay')
@ApiExcludeController()
export class RazorpayWebhookController {
  private readonly RAZORPAY_WEBHOOK_SECRET: string;

  constructor() {
    const configService = new ConfigService();
    this.RAZORPAY_WEBHOOK_SECRET = configService.getOrThrow<string>(
      'RAZORPAY_WEBHOOK_SECRET',
    );
  }

  @Post()
  @Public()
  handleRazorpayWebhook(
    @RawBody() rawBody: Buffer,
    @Req() req: Request,
    @Headers('x-razorpay-signature') signature: string,
  ) {
    const webhookSecret = this.RAZORPAY_WEBHOOK_SECRET;

    if (!rawBody) {
      console.log('⚠️ Missing raw body');
      throw new BadRequestException('Missing raw body');
    }

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex');

    if (expectedSignature !== signature) {
      console.log('⚠️ Invalid Signature');
      throw new BadRequestException('Invalid signature');
    }

    console.log('✔️ Webhook Verified Successfully');
    console.log('Payload:', req.body);

    return { status: 'ok' };
  }
}
