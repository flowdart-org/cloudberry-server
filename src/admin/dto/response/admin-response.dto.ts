import { Admin } from '@/admin/entities/admin.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AdminResponseDto {
  @ApiProperty({ example: '1', description: 'Unique identifier for the admin' })
  public id: string;

  @ApiProperty({
    example: 'admin@gmail.com',
    description: 'Email address of the admin',
  })
  public email: string;

  @ApiProperty({ example: 'Admin Name', description: 'Name of the admin' })
  public name: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Timestamp when the admin was last updated',
  })
  public updatedAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Timestamp when the admin was created',
  })
  public createdAt: Date;

  constructor(entity: Admin) {
    this.id = entity.id;
    this.email = entity.email;
    this.name = entity.name;
    this.updatedAt = entity.updatedAt;
    this.createdAt = entity.createdAt;
  }
}
