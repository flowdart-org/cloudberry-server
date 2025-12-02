import { Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { Address } from '@/user/entities/address.entity';
import { AddressMapper } from '@/user/mappers/address.mapper';
import { IAddressRepository } from './interfaces/address.repository';

export class PrismaAddressRepository implements IAddressRepository {
  constructor(
    @Inject('PrismaService') private readonly _prisma: PrismaClient,
  ) {}

  async findById(id: string): Promise<Address | null> {
    const doc = await this._prisma.address.findUnique({
      where: { id },
    });

    return doc ? AddressMapper.toEntity(doc) : null;
  }

  async create(
    userId: string,
    data: Partial<Address>,
    isPrimary: boolean = false,
  ): Promise<Address> {
    const doc = await this._prisma.address.create({
      data: {
        ...data,
        isPrimary,
        userId,
      },
    });

    return AddressMapper.toEntity(doc);
  }

  async update(id: string, data: Partial<Address>): Promise<Address> {
    const doc = await this._prisma.address.update({
      where: { id },
      data,
    });

    return AddressMapper.toEntity(doc);
  }

  async delete(id: string): Promise<void> {
    await this._prisma.address.delete({
      where: { id },
    });
  }
}
