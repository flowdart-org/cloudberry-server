import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString, Length } from 'class-validator';

export class LoginVerifyOTPDto {
  @IsPhoneNumber('IN', {
    message: 'Phone number must be a valid Indian phone number',
  })
  @ApiProperty({
    example: '+91 9605119661',
    description: 'Phone number of the user',
  })
  public phone: string;

  @IsString({ message: 'OTP must be a String' })
  @Length(4, 4, { message: 'OTP must be 6 characters long' })
  @ApiProperty({
    example: '000000',
    description: 'OTP',
  })
  public otp: number;
}
