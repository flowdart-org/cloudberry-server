import type { Admin } from '@prisma/client';

export interface IAdminRepository {
  create(data: any): Promise<any>;
  findById(id: string): Promise<Admin | null>;
  findAll(): Promise<any[]>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<void>;
}
