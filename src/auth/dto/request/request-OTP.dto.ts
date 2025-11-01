import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginRequestOTPDto {
  @ApiProperty({
    example: '+919605119661 or rahilsardar234@gmail.com',
    description: 'Email or phone number of the user',
  })
  @IsNotEmpty({ message: 'Email or phone number is required' })
  public identifier: string;
}
