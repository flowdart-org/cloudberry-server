import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient as BasePrismaClient } from '@prisma/client';

@Injectable()
export class PrismaClient
  extends BasePrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }

  // async runTransaction<T>(
  //     fn: (prisma: Omit<PrismaClient, ITXClientDenyList>) => Promise<T>,
  // ): Promise<T> {
  //     return this.$transaction(async (tx) => fn(tx));
  // }
}
