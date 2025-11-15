import { Controller, Post, Body } from '@nestjs/common';

import { HTTP_RESPONSE } from '@/common/types';
import { Role } from '@/common/enums/role.enum';
import { TryOnService } from '@/ai/try-on/try-on.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserId } from '@/common/decorators/user-id.decorator';
import { CreateTryOnDto } from '@/ai/try-on/dto/create-try-on.dto';

@Controller('ai/try-on')
export class TryOnController {
  constructor(private readonly _tryOnService: TryOnService) {}

  @Post()
  @Roles(Role.USER)
  async tryOn(
    @Body() createTryOnDto: CreateTryOnDto,
    @UserId() userId: string,
  ): Promise<HTTP_RESPONSE<string[]>> {
    console.log('Received try-on request:', { userId, createTryOnDto });

    const data = await this._tryOnService.generateTryOn(userId, createTryOnDto);

    return {
      success: true,
      message: 'Try-on operation completed successfully',
      data,
    };
  }
}
