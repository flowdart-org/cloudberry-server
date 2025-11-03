import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsString()
  public email?: string;

  @IsOptional()
  @IsString()
  public phone?: string;

  @IsOptional()
  @IsDateString()
  public dob?: Date;

  @IsOptional()
  @IsString({ groups: ['male', 'female', 'other'] })
  public gender?: 'male' | 'female' | 'other';

  @IsOptional()
  @IsString()
  public password?: string;
}
