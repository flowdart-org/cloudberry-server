import { User as UserEntity } from '@/user/entities/user.entity';
import { User as PrismaUser } from '@/user/entities/user.entity';

export type CreateUserInput =
  | { email: string; phone?: undefined }
  | { phone: string; email?: undefined };

export interface IUserRepository {
  create(data: {
    email: string | undefined;
    phone: string | undefined;
  }): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findByPhone(phone: string): Promise<UserEntity | null>;
  findAll(): Promise<UserEntity[]>;
  update(
    id: string,
    data: Partial<Omit<PrismaUser, 'id' | 'updatedAt' | 'createdAt'>>,
  ): Promise<UserEntity | null>;
  delete(id: string): Promise<void>;
}
