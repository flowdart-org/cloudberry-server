import { Inject, Injectable } from '@nestjs/common';

import { Admin } from '@/admin/entities/admin.entity';
import type { IAdminRepository } from '@/admin/repositories/interfaces/admin.repository';
import { CreateAdminDto } from '@/admin/dto/create-admin.dto';
import { UpdateAdminDto } from '@/admin/dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @Inject('AdminRepository')
    private readonly _adminRepository: IAdminRepository,
  ) {}

  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  async findAdmin(userId: string): Promise<Admin | null> {
    const admin = await this._adminRepository.findById(userId);
    return admin ? admin : null;
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
