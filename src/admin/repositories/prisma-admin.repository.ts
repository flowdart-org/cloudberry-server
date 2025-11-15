import { Admin as PrismaAdmin } from '@prisma/client';

import { Admin as AdminEntity } from '@/admin/entities/admin.entity';
import { IAdminRepository } from '@/admin/repositories/interfaces/admin.repository';
import { AdminMapper } from '@/admin/mappers/admin.mapper';
import { Inject } from '@nestjs/common';
import { PrismaClient } from '@/common/prisma/prisma-client';

export class PrismaAdminRepository implements IAdminRepository {
  constructor(@Inject('PrismaClient') private readonly prisma: PrismaClient) {
    (async () => {
      const admin = await this.prisma.admin.findUnique({
        where: {
          email: 'admin@gmail.com',
        },
      });

      if (!admin) {
        await this.prisma.admin.create({
          data: {
            name: 'Admin',
            email: 'admin@gmail.com',
            password: 'password',
          },
        });

        console.log(
          'admin has created',
          '\n',
          await this.prisma.admin.findMany(),
        );
      }
    })();
  }

  create(
    data: Omit<PrismaAdmin, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<AdminEntity> {
    return this.prisma.admin.create({
      data: AdminMapper.toPersistence(data),
    });
  }

  findAll(): Promise<AdminEntity[]> {
    return this.prisma.admin.findMany();
  }

  async findById(id: string): Promise<AdminEntity | null> {
    const doc = await this.prisma.admin.findUnique({
      where: { id },
    });
    return doc ? AdminMapper.toEntity(doc) : null;
  }

  async findByEmail(email: string): Promise<AdminEntity | null> {
    const doc = await this.prisma.admin.findUnique({
      where: { email },
    });
    return doc ? AdminMapper.toEntity(doc) : null;
  }

  async update(
    id: string,
    data: Pick<AdminEntity, 'name' | 'email' | 'password'>,
  ): Promise<AdminEntity> {
    const doc = await this.prisma.admin.update({
      where: { id },
      data: AdminMapper.toPersistence(data),
    });
    return AdminMapper.toEntity(doc);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.admin.delete({
      where: { id },
    });
  }
}
