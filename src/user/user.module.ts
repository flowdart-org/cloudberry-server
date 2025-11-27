import { Module } from '@nestjs/common';

import { MediaModule } from '@/media/media.module';
import { UserController } from '@/user/user.controller';
import { UserService } from '@/user/services/user.service';
import { PrismaClient } from '@/common/prisma/prisma-client';
import { AddressService } from '@/user/services/address.service';
import { PrismaUserRepository } from '@/user/repositories/prisma-user.repository';
import { PrismaAddressRepository } from '@/user/repositories/prisma-address.repository';

@Module({
  imports: [MediaModule],
  controllers: [UserController],
  providers: [
    UserService,
    AddressService,
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
    {
      provide: 'AddressRepository',
      useClass: PrismaAddressRepository,
    },
    { provide: 'PrismaClient', useClass: PrismaClient },
  ],
  exports: [UserService],
})
export class UserModule {}
