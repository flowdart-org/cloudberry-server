import { Admin as PrismaAdmin } from '@prisma/client';
import { IAdminRepository } from '@/admin/repositories/interfaces/admin.repository';
import { PrismaClient } from '@/common/prisma/prisma-client';

export class PrismaAdminRepository implements IAdminRepository {
  constructor(private readonly _prisma: PrismaClient) {}

  create(data: any): Promise<any> {
    return Promise.resolve(undefined);
  }

  findAll(): Promise<any[]> {
    return Promise.resolve([]);
  }

  async findById(id: string): Promise<PrismaAdmin | null> {
    return this._prisma.admin.findUnique({
      where: { id },
    });
  }

  update(id: string, data: any): Promise<any> {
    return Promise.resolve(undefined);
  }

  delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
