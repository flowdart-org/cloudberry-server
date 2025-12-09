import { Address as PrismaAddress } from '@prisma/client';

import { Address } from '@/user/entities/address.entity';

export const AddressMapper = {
  toEntity(this: void, model: PrismaAddress): Address {
    return {
      id: model.id,
      isPrimary: model.isPrimary,
      userId: model.userId,
      houseNo: model.houseNo,
      street: model.street,
      city: model.city,
      state: model.state,
      country: model.country,
      pincode: model.pincode,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  },
};
