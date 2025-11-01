import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaUserRepository } from '@/user/repositories/prisma-user.repository';
import { PrismaClient } from '@/common/prisma/prisma-client';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
    { provide: 'PrismaClient', useClass: PrismaClient },
  ],
  exports: [UserService],
})
export class UserModule {}
