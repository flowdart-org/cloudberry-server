import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import type { ApiResponseOptions } from '@nestjs/swagger';
import { HttpResponse } from '@/common/dto/http-response.dto';

export const ApiResponseWithType = <TModel extends Type>(
  model: TModel,
  description = 'Success',
  options: ApiResponseOptions,
) => {
  return applyDecorators(
    ApiExtraModels(HttpResponse, model),
    ApiOkResponse({
      description,
      ...options,
      schema: {
        allOf: [
          { $ref: getSchemaPath(HttpResponse) },
          {
            properties: {
              data: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
};
