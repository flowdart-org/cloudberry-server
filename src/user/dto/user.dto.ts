import { User } from '@/user/entities/user.entity';
import { Address } from '@/user/entities/address.entity';
import { ReadUrlResponse } from '@/media/services/media.service';

export class UserDto {
  public id: string;
  public name?: string;
  public email?: string;
  public phone?: string;
  public password?: string;
  public dob?: Date;
  public gender?: 'male' | 'female' | 'other';
  public tryOnImage: string | null;
  public tryOnLimit: number;
  public addresses: Address[];
  public status: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(entity: User, tryOnImage?: ReadUrlResponse | null) {
    this.id = entity.id;
    this.name = entity.name || undefined;
    this.email = entity.email || undefined;
    this.phone = entity.phone || undefined;
    this.password = entity.password || undefined;
    this.dob = entity.dob || undefined;
    this.tryOnImage = tryOnImage?.readUrl || null;
    this.gender = entity.gender || undefined;
    this.tryOnLimit = entity.tryOnLimit;
    this.addresses = entity.address;
    this.status = entity.status;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
