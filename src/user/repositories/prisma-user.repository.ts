import { Inject } from '@nestjs/common';

import { User } from '@/user/entities/user.entity';
import { User as UserEntity } from '@/user/entities/user.entity';
import { PrismaClient, User as PrismaUser } from '@prisma/client';
import { IUserRepository } from '@/user/repositories/interfaces/user.repository';
import { UserMapper } from '@/user/mappers/user.mapper';

export class PrismaUserRepository implements IUserRepository {
  constructor(@Inject('PrismaClient') private readonly _prisma: PrismaClient) {}

  async create(data: Partial<PrismaUser>): Promise<User> {
    const doc = await this._prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        dob: data.dob,
        password: data.password,
      },
    });
    return UserMapper.toEntity(doc);
  }

  async findAll(): Promise<User[]> {
    const docs = await this._prisma.user.findMany();
    return docs.length ? docs.map(UserMapper.toEntity) : [];
  }

  async findById(id: string): Promise<User | null> {
    const doc = await this._prisma.user.findUnique({
      where: { id },
    });
    return doc ? UserMapper.toEntity(doc) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await this._prisma.user.findUnique({
      where: { email },
    });
    return doc ? UserMapper.toEntity(doc) : null;
  }

  async findByPhone(phone: string): Promise<User | null> {
    const doc = await this._prisma.user.findUnique({
      where: { phone },
    });
    return doc ? UserMapper.toEntity(doc) : null;
  }

  async update(
    id: string,
    data: Partial<Omit<UserEntity, 'id' | 'updatedAt' | 'createdAt'>>,
  ): Promise<User | null> {
    const doc = await this._prisma.user.update({
      where: { id },
      data: data,
    });
    return doc ? UserMapper.toEntity(doc) : null;
  }
}
