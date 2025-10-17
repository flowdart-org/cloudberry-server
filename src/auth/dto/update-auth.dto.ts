import { PartialType } from '@nestjs/mapped-types';
import { UserLoginDto } from './user-login.dto';

export class UpdateAuthDto extends PartialType(UserLoginDto) {}
