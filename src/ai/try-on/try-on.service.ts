import axios from 'axios';

import { UserService } from '@/user/user.service';
import { ProductService } from '@/product/product.service';
import { TryOnMediaService } from '@/media/tryon-upload.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTryOnDto } from '@/ai/try-on/dto/create-try-on.dto';
import { TryOnRequest, VertexService } from '@/ai/vertex/vertex.service';

@Injectable()
export class TryOnService {
  constructor(
    private readonly _vertexService: VertexService,
    private readonly _productService: ProductService,
    private readonly _userService: UserService,
    private readonly _tryOnMediaService: TryOnMediaService,
  ) {}

  private async _urlToBase64(this: void, url: string): Promise<string> {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data).toString('base64');
  }

  async generateTryOn(userId: string, dto: CreateTryOnDto): Promise<string[]> {
    const product = await this._productService.findOne(dto.productId);

    const user = await this._userService.findById(userId);

    if (!product) {
      throw new BadRequestException('Product not found');
    } else if (!product.tryOn) {
      throw new BadRequestException('Try-On not available for this product');
    } else if (!user || !user.tryOnImage) {
      throw new BadRequestException('User profile image not found');
    }

    const personImageUrl = user.tryOnImage;

    const productImageUrls = [product.thumbnail];

    const [personImageBase64, ...productImagesBase64] = await Promise.all([
      this._urlToBase64(personImageUrl),
      ...productImageUrls.map(this._urlToBase64),
    ]);

    const req: TryOnRequest = {
      personImage: {
        base64: personImageBase64,
      },
      productImages: productImagesBase64.map((base64) => ({ base64 })),
    };

    const data = await this._vertexService.virtualTryOn(req);

    const result = await Promise.all(
      data.predictions.map(async (prediction) =>
        this._tryOnMediaService.uploadTryOnResultBase64(
          userId,
          product.id,
          prediction.bytesBase64Encoded,
        ),
      ),
    );

    console.log('Virtual Try-On Response:', result);
    return result;
  }
}
