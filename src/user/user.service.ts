import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { IUserRepository } from '@/user/repositories/interfaces/user.repository';
import { User } from '@/user/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly _userRepository: IUserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, phone } = createUserDto;

    if (!email && !phone) {
      throw new Error('Either email or phone is required');
    }

    return this._userRepository.create({
      email,
      phone,
    });
  }

  findAll(): Promise<User[]> {
    return this._userRepository.findAll();
  }

  findById(id: string): Promise<User | null> {
    return this._userRepository.findById(id);
  }

  findByEmail(email: string): Promise<User | null> {
    return this._userRepository.findByEmail(email);
  }

  findByPhone(phone: string): Promise<User | null> {
    return this._userRepository.findByPhone(phone);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this._userRepository.update(id, updateUserDto);
  }
}
