import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { UserDto } from '@/user/dto/user.dto';

export class UserResponseDto {
  @ApiProperty({
    example: 'uuid-v4-string',
    description: 'Unique identifier for the user',
  })
  public id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
  })
  @ApiPropertyOptional()
  public name?: string;

  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Email address of the user',
  })
  @ApiPropertyOptional()
  public email?: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the user',
  })
  @ApiPropertyOptional()
  public phone?: string;

  @ApiProperty({
    example: '1990-01-01T00:00:00.000Z',
    description: 'Date of birth of the user',
  })
  @ApiPropertyOptional()
  public dob?: Date;

  @ApiProperty({
    example: 'male',
    description: 'Gender of the user',
  })
  @ApiPropertyOptional()
  public gender?: 'male' | 'female' | 'other';

  @ApiProperty({
    example: 'https://example.com/try-on-image.jpg',
    description: 'URL of the user try-on image',
  })
  @ApiPropertyOptional()
  public tryOnImage: string | null;

  @ApiProperty({
    example: 'https://example.com/try-on-image.jpg',
    description: 'URL of the user try-on image',
  })
  @ApiPropertyOptional()
  public tryOnLimit: number;

  @ApiProperty({
    example: 'active',
    description: 'Current status of the user account',
  })
  public status: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Account creation timestamp',
  })
  public joined: Date;

  static fromEntity(this: void, entity: UserDto): UserResponseDto {
    return {
      id: entity.id,
      name: entity.name || undefined,
      email: entity.email || undefined,
      phone: entity.phone || undefined,
      dob: entity.dob || undefined,
      gender: entity.gender || undefined,
      tryOnImage: entity.tryOnImage || null,
      tryOnLimit: entity.tryOnLimit,
      status: entity.status,
      joined: entity.createdAt,
    };
  }
}
