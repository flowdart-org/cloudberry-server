import { Controller, Post, Body } from '@nestjs/common';
import { HTTP_RESPONSE } from '@/common/types';

import { CreateTryOnDto } from '@/ai/try-on/dto/create-try-on.dto';
import { TryOnResponse } from '@/ai/vertex/vertex.service';
import { TryOnService } from '@/ai/try-on/try-on.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/common/enums/role.enum';

@Controller('ai/try-on')
export class TryOnController {
  constructor(private readonly _tryOnService: TryOnService) {}

  @Post()
  @Roles(Role.USER)
  async tryOn(
    @Body() createTryOnDto: CreateTryOnDto,
  ): Promise<HTTP_RESPONSE<TryOnResponse>> {
    await this._tryOnService.generateTryOn(createTryOnDto);

    return {
      success: true,
      message: 'Try-on operation completed successfully',
    };
  }
}
