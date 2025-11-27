import { Inject } from '@nestjs/common';

import { User } from '@/user/entities/user.entity';
import { UserMapper } from '@/user/mappers/user.mapper';
import { User as UserEntity } from '@/user/entities/user.entity';
import { PrismaClient, User as PrismaUser } from '@prisma/client';
import { IUserRepository } from '@/user/repositories/interfaces/user.repository';
import { UserPaginatedQueryDto } from '@/user/dto/request/user-paginated-query.dto';

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
      include: {
        addresses: true,
      },
    });
    return UserMapper.toEntity(doc);
  }

  async find(query: UserPaginatedQueryDto): Promise<User[]> {
    const { page = 1, limit = 10, search, status } = query;

    const docs = await this._prisma.user.findMany({
      where: {
        OR: search
          ? [
              { name: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
              { phone: { contains: search, mode: 'insensitive' } },
            ]
          : undefined,
        status: status,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        addresses: true,
      },
    });

    return docs.map((d) => UserMapper.toEntity(d));
  }

  async findById(id: string): Promise<User | null> {
    const doc = await this._prisma.user.findUnique({
      where: { id },
      include: {
        addresses: true,
      },
    });
    return doc ? UserMapper.toEntity(doc) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await this._prisma.user.findUnique({
      where: { email },
      include: {
        addresses: true,
      },
    });
    return doc ? UserMapper.toEntity(doc) : null;
  }

  async findByPhone(phone: string): Promise<User | null> {
    const doc = await this._prisma.user.findUnique({
      where: { phone },
      include: {
        addresses: true,
      },
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
      include: {
        addresses: true,
      },
    });
    return doc ? UserMapper.toEntity(doc) : null;
  }
}
