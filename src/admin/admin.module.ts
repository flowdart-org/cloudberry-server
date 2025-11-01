import { Module } from '@nestjs/common';
import { PrismaClient } from '@/common/prisma/prisma-client';
import { PrismaAdminRepository } from '@/admin/repositories/prisma-admin.repository';
import { AdminController } from '@/admin/admin.controller';
import { AdminService } from '@/admin/admin.service';

@Module({
  controllers: [AdminController],
  providers: [
    AdminService,
    {
      provide: 'AdminRepository',
      useClass: PrismaAdminRepository,
    },
    { provide: 'PrismaClient', useClass: PrismaClient },
  ],
  exports: [AdminService],
})
export class AdminModule {}
