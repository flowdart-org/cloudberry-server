import { User as PrismaUser, Address as PrismaAddress } from '@prisma/client';

import { AddressMapper } from '@/user/mappers/address.mapper';
import { User as UserEntity } from '@/user/entities/user.entity';

export const UserMapper = {
  toEntity(
    this: void,
    prismaUser: PrismaUser & {
      addresses?: PrismaAddress[];
    },
  ): UserEntity {
    return new UserEntity(
      prismaUser.id,
      prismaUser.name,
      prismaUser.email,
      prismaUser.phone,
      prismaUser.dob,
      prismaUser.gender,
      prismaUser.password,
      prismaUser.tryOnLimit,
      prismaUser.addresses
        ? prismaUser.addresses.map(AddressMapper.toEntity)
        : [],
      prismaUser.status,
      prismaUser.createdAt,
      prismaUser.updatedAt,
    );
  },
};
