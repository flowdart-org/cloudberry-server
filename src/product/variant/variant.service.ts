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
    const existingVariants =
      await this._variantRepository.findManyByProductId(productId);

    console.log('variant update 1', existingVariants, variants);

    const existingMap = new Map<string, ProductVariant>(
      existingVariants.map((v): [string, ProductVariant] => [v.id, v]),
    );

    const incomingIds = new Set(variants.filter((v) => v.id).map((v) => v.id));

    const results: VariantDto[] = [];

    for (const variant of variants) {
      if (variant.id && existingMap.has(variant.id)) {
        const updated = await this._variantRepository.update(variant.id, {
          ...variant,
          isDeleted: false,
        });
        results.push(updated);
      } else {
        const created = await this._variantRepository.create({
          ...variant,
          productId,
          isDeleted: false,
        });
        results.push(created);
      }
    }

    console.log('variant update', results);

    const toDelete = existingVariants.filter((v) => !incomingIds.has(v.id));
    for (const variant of toDelete) {
      await this._variantRepository.update(variant.id, { isDeleted: true });
    }

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
