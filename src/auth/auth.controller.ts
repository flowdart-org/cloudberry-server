import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { HTTP_RESPONSE } from '@/common/types';
import { UserRegisterDto } from '@/auth/dto/user-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  async register(@Body() dto: UserRegisterDto): Promise<HTTP_RESPONSE> {
    await this._authService.register(dto);

    return {
      message: 'User registered successfully',
      success: true,
    };
  }

  // @Get()
  // findAll() {
  //     return this.authService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //     return this.authService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //     return this.authService.update(+id, updateAuthDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //     return this.authService.remove(+id);
  // }
}
