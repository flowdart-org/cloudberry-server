import { IUserRepository } from '@/user/repositories/interfaces/user.repository';
import { PrismaClient } from '@/common/prisma/prisma-client';
import type { User as PrismaUser } from '@prisma/client';
import { User } from '@/user/entities/user.entity';

export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly _prisma: PrismaClient) {}

  create(data: PrismaUser): Promise<User> {
    return this._prisma.user.create({
      data: data,
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

  update(id: string, data: PrismaUser): Promise<User> {
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
