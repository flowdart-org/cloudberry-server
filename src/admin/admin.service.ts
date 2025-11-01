import { Inject, Injectable } from '@nestjs/common';

import { Admin } from '@/admin/entities/admin.entity';
import type { IAdminRepository } from '@/admin/repositories/interfaces/admin.repository';

@Injectable()
export class AdminService {
  constructor(
    @Inject('AdminRepository')
    private readonly _adminRepository: IAdminRepository,
  ) {}

  async findById(userId: string): Promise<Admin | null> {
    const admin = await this._adminRepository.findById(userId);
    return admin ? admin : null;
  }

  async findByEmail(email: string): Promise<Admin | null> {
    const admin = await this._adminRepository.findByEmail(email);
    return admin ? admin : null;
  }

  findAll(): Promise<Admin[]> {
    return this._adminRepository.findAll();
  }

  update(id: string, updateData: Partial<Admin>): Promise<Admin> {
    return this._adminRepository.update(id, updateData);
  }
}
