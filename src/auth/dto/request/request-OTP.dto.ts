import { IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestOTPDto {
  @IsPhoneNumber('IN', {
    message: 'Phone number must be a valid Indian phone number',
  })
  @ApiProperty({
    example: '+91 9605119661',
    description: 'Phone number of the user',
  })
  public phone: string;
}
