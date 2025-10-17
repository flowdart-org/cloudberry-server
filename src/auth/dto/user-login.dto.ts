import { IsPhoneNumber } from 'class-validator';

export class UserLoginDto {
  @IsPhoneNumber('IN', {
    message: 'Phone number must be a valid Indian phone number',
  })
  public phoneNumber: string;
}
