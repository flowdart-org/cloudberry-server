import { Inject } from '@nestjs/common';

import { PrismaClient, User as PrismaUser } from '@prisma/client';
import { User as UserEntity } from '@/user/entities/user.entity';
import { IUserRepository } from '@/user/repositories/interfaces/user.repository';
import { User } from '@/user/entities/user.entity';

export class PrismaUserRepository implements IUserRepository {
  constructor(@Inject('PrismaClient') private readonly _prisma: PrismaClient) {}

  create(data: Partial<PrismaUser>): Promise<User> {
    return this._prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        dob: data.dob,
        password: data.password,
      },
    });
  }

  findAll(): Promise<User[]> {
    return this._prisma.user.findMany();
  }

  findById(id: string): Promise<User | null> {
    return this._prisma.user.findUnique({
      where: { id },
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return this._prisma.user.findUnique({
      where: { email },
    });
  }

  findByPhone(phone: string): Promise<User | null> {
    return this._prisma.user.findUnique({
      where: { phone },
    });
  }

  update(
    id: string,
    data: Partial<Omit<UserEntity, 'id' | 'updatedAt' | 'createdAt'>>,
  ): Promise<User> {
    return this._prisma.user.update({
      where: { id },
      data: data,
    });
  }

  async delete(id: string): Promise<void> {
    await this._prisma.user.delete({
      where: { id },
    });
  }
}
