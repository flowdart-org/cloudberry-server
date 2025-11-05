import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCartDto {
  @IsString()
  productId: string;

  @IsOptional()
  @IsString()
  variantId?: string;

  @IsNumber()
  quantity: number;
}
