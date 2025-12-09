import { Address } from '@/user/entities/address.entity';

export interface IAddressRepository {
  findById(id: string): Promise<Address | null>;
  create(
    userId: string,
    data: Partial<Address>,
    isPrimary: boolean,
  ): Promise<Address>;
  update(id: string, data: Partial<Address>): Promise<Address>;
  delete(id: string): Promise<void>;
}
