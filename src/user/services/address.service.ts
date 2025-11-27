import { Inject, Injectable } from '@nestjs/common';

import { Address } from '@/user/entities/address.entity';
import { UserService } from '@/user/services/user.service';
import { UpdateAddressDto } from '@/user/dto/request/update-address.dto';
import { IAddressRepository } from '@/user/repositories/interfaces/address.repository';

@Injectable()
export class AddressService {
  constructor(
    @Inject('AddressRepository')
    private readonly _addressRepository: IAddressRepository,
    private readonly _userService: UserService,
  ) {}

  async create(userId: string, dto: UpdateAddressDto): Promise<Address> {
    const user = await this._userService.findById(userId);
    if (!user) throw new Error('User not found');

    const addresses = user.addresses ?? [];

    if (addresses.length > 0) {
      await Promise.all(
        addresses.map((a) => this._addressRepository.delete(a.id)),
      );
    }

    return this._addressRepository.create(userId, dto, true);
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateAddressDto,
  ): Promise<Address> {
    const user = await this._userService.findById(userId);
    if (!user) throw new Error('User not found');

    const address = await this._addressRepository.findById(id);
    if (!address) throw new Error('Address not found');

    if (address.userId !== userId) {
      throw new Error('Unauthorized to update this address');
    }

    return this._addressRepository.update(id, dto);
  }
}
