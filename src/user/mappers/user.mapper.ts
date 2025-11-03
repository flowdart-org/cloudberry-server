import { User as PrismaUser } from '@prisma/client';
import { User as UserEntity } from '@/user/entities/user.entity';

export const UserMapper = {
  toEntity(this: void, prismaUser: PrismaUser): UserEntity {
    return new UserEntity(
      prismaUser.id,
      prismaUser.name,
      prismaUser.email,
      prismaUser.phone,
      prismaUser.dob,
      prismaUser.gender,
      prismaUser.status,
      prismaUser.password,
      prismaUser.createdAt,
      prismaUser.updatedAt,
    );
  },

  toPersistence(
    user: UserEntity,
  ): Omit<PrismaUser, 'id' | 'createdAt' | 'updatedAt'> {
    return {
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      dob: user.dob,
      status: user.status,
      password: user.password,
    };
  },
};
