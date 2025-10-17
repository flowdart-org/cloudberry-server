import { IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto {
  @IsPhoneNumber('IN', {
    message: 'Phone number must be a valid Indian phone number',
  })
  @ApiProperty({
    example: '0000000000',
    description: 'Phone number of the user',
  })
  public phoneNumber: string;
}
