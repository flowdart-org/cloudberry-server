import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '@/user/entities/user.entity';

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
    example: '2024-01-01T00:00:00.000Z',
    description: 'Account creation timestamp',
  })
  public createdAt: Date;

  @ApiProperty({
    example: '2024-06-01T00:00:00.000Z',
    description: 'Last account update timestamp',
  })
  public updatedAt: Date;

  constructor(entity: User) {
    this.id = entity.id;
    this.name = entity.name || undefined;
    this.email = entity.email || undefined;
    this.phone = entity.phone || undefined;
    this.dob = entity.dob || undefined;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
