import { Module } from '@nestjs/common';

import { AdminService } from '@/admin/admin.service';
import { AdminController } from '@/admin/admin.controller';
import { PrismaAdminRepository } from '@/admin/repositories/prisma-admin.repository';

@Module({
  controllers: [AdminController],
  providers: [
    AdminService,
    {
      provide: 'AdminRepository',
      useClass: PrismaAdminRepository,
    },
  ],
  exports: [AdminService],
})
export class AdminModule {}
