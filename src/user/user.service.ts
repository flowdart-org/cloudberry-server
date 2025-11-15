import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { UserDto } from '@/user/dto/user.dto';
import { User } from '@/user/entities/user.entity';
import { MediaService } from '@/media/media.service';
import { UpdateUserDto } from '@/user/dto/request/update-user.dto';
import { CreateUserDto } from '@/user/dto/request/create-user.dto';
import { UserResponseDto } from '@/user/dto/response/user-response.dto';
import { UpdateStatusUserDto } from '@/user/dto/request/update-status-user.dto';
import type { IUserRepository } from '@/user/repositories/interfaces/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly _mediaService: MediaService,
    @Inject('UserRepository') private readonly _userRepository: IUserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, phone } = createUserDto;

    if (!email && !phone) {
      throw new Error('Either email or phone is required');
    }

    return this._userRepository.create({
      email,
      phone,
    });
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this._userRepository.findAll();
    return users.length ? users.map((u) => new UserDto(u)) : [];
  }

  async findById(id: string): Promise<UserDto | null> {
    const user = await this._userRepository.findById(id);
    const tryOnImage = user
      ? this._mediaService.getUserTryOnImageUrl(id)
      : null;
    return user ? new UserDto(user, tryOnImage) : null;
  }

  findByEmail(email: string): Promise<User | null> {
    return this._userRepository.findByEmail(email);
  }

  findByPhone(phone: string): Promise<User | null> {
    return this._userRepository.findByPhone(phone);
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    const doc = await this._userRepository.update(id, dto);

    if (!doc)
      throw new BadRequestException('User update failed. User not found');

    const userDto = new UserDto(doc);

    return new UserResponseDto(userDto);
  }

  async updateStatus(
    id: string,
    dto: UpdateStatusUserDto,
  ): Promise<UserResponseDto> {
    const doc = await this._userRepository.update(id, {
      status: dto.status,
    });

    if (!doc)
      throw new BadRequestException(
        'User status update failed. User not found',
      );

    const userDto = new UserDto(doc);

    return new UserResponseDto(userDto);
  }
}
