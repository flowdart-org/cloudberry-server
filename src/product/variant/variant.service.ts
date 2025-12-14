import { Inject, Injectable } from '@nestjs/common';

import type { VariantRepository } from '@/product/variant/repositories/interfaces/variant.repository';
import { ProductVariant } from '@/product/variant/entities/product-variant.entity';
import { VariantDto } from '@/product/variant/dto/variant.dto';

@Injectable()
export class VariantService {
  constructor(
    @Inject('VariantRepository')
    private readonly _variantRepository: VariantRepository,
  ) {}

  async createOrUpdateMany(
    productId: string,
    variants: VariantDto[],
  ): Promise<VariantDto[]> {
    const existingVariants = await this._variantRepository.findManyByProductId(
      productId,
      {
        isDeleted: false,
      },
    );

    const existingMap = new Map(existingVariants.map((v) => [v.id, v]));

    const incomingIds = new Set(
      variants.map((v) => v.id).filter((id): id is string => Boolean(id)),
    );

    const upsertOps = variants.map(async (variant) => {
      const { id, ...data } = variant;

      if (id && existingMap.has(id)) {
        return this._variantRepository.update(id, data);
      }

      return this._variantRepository.create({
        ...data,
        productId,
        isDeleted: false,
      });
    });

    const results = await Promise.all(upsertOps);

    const toDelete = existingVariants.filter((v) => !incomingIds.has(v.id));

    await Promise.all(
      toDelete.map((v) =>
        this._variantRepository.update(v.id, { isDeleted: true }),
      ),
    );

    return results;
  }

  findByProductId(productId: string) {
    return this._variantRepository.findManyByProductId(productId);
  }

  async findById(variantId: string): Promise<ProductVariant> {
    const variant = await this._variantRepository.findById(variantId);
    if (!variant) throw new Error('Variant not found');
    return variant;
  }

  decreaseStock(variantId: string, quantity: number) {
    return this._variantRepository.reduceStock(variantId, quantity);
  }
}
