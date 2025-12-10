import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UserDto } from '@/user/dto/user.dto';
import { MediaService } from '@/media/services/media.service';
import { UpdateUserDto } from '@/user/dto/request/update-user.dto';
import { CreateUserDto } from '@/user/dto/request/create-user.dto';
import { UpdateStatusUserDto } from '@/user/dto/request/update-status-user.dto';
import { UserPaginatedQueryDto } from '@/user/dto/request/user-paginated-query.dto';
import type { IUserRepository } from '@/user/repositories/interfaces/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly _mediaService: MediaService,
    @Inject('UserRepository') private readonly _userRepository: IUserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const { email, phone } = createUserDto;

    if (!email && !phone) {
      throw new Error('Either email or phone is required');
    }

    const user = await this._userRepository.create({
      email,
      phone,
    });

    return new UserDto(user);
  }

  async find(query: UserPaginatedQueryDto): Promise<UserDto[]> {
    const users = await this._userRepository.find(query);
    return users.length ? users.map((u) => new UserDto(u)) : [];
  }

  async findById(id: string): Promise<UserDto> {
    const user = await this._userRepository.findById(id);

    if (!user) throw new UnauthorizedException('User not found');

    const tryOnImage = await this._mediaService.getUserTryOnReadUrl(id);

    return new UserDto(user, tryOnImage);
  }

  async findByEmail(email: string): Promise<UserDto | null> {
    const user = await this._userRepository.findByEmail(email);
    if (!user) return null;
    return new UserDto(user);
  }

  async findByPhone(phone: string): Promise<UserDto | null> {
    const user = await this._userRepository.findByPhone(phone);
    if (!user) return null;
    return new UserDto(user);
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserDto> {
    const doc = await this._userRepository.update(id, dto);

    if (!doc)
      throw new BadRequestException('User update failed. User not found');

    const tryOnImage = await this._mediaService.getUserTryOnReadUrl(id);

    return new UserDto(doc, tryOnImage);
  }

  async updateStatus(id: string, dto: UpdateStatusUserDto): Promise<UserDto> {
    const doc = await this._userRepository.update(id, {
      status: dto.status,
    });

    if (!doc)
      throw new BadRequestException(
        'User status update failed. User not found',
      );

    return new UserDto(doc);
  }

  async getTryOnLimit(id: string): Promise<number> {
    const user = await this._userRepository.findById(id);

    if (!user) throw new BadRequestException('User not found');

    return user.tryOnLimit;
  }

  async consumeTryOnLimit(id: string): Promise<boolean> {
    const user = await this._userRepository.findById(id);

    if (!user) throw new BadRequestException('User not found');

    if (user.tryOnLimit < 1) return false;

    await this._userRepository.update(id, {
      tryOnLimit: user.tryOnLimit - 1,
    });

    return true;
  }
}
