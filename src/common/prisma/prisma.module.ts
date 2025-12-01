import { Global, Module } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

@Global()
@Module({
  providers: [{ provide: 'PrismaClient', useClass: PrismaService }],
  exports: ['PrismaClient'],
})
export class PrismaModule {}
