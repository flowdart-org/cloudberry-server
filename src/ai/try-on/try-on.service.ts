import { Injectable } from '@nestjs/common';
import { CreateTryOnDto } from '@/ai/try-on/dto/create-try-on.dto';
import { TryOnRequest, VertexService } from '@/ai/vertex/vertex.service';
import axios from 'axios';

@Injectable()
export class TryOnService {
  constructor(private readonly _vertexService: VertexService) {}

  private async urlToBase64(this: void, url: string): Promise<string> {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data).toString('base64');
  }

  async generateTryOn(createTryOnDto: CreateTryOnDto): Promise<void> {
    const personImageUrl =
      'https://res.cloudinary.com/snapcart-website/image/upload/v1761713058/IMG_9277_Medium_df39i6.jpg';
    const productImageUrls = [
      'https://res.cloudin[ary.com/snapcart-website/image/upload/v1761713131/product-1_qu8n03.webp',
    ];

    const [personImageBase64, ...productImagesBase64] = await Promise.all([
      this.urlToBase64(personImageUrl),
      ...productImageUrls.map(this.urlToBase64),
    ]);

    const req: TryOnRequest = {
      personImage: {
        base64: personImageBase64,
      },
      productImages: productImagesBase64.map((base64) => ({ base64 })),
    };

    const data = await this._vertexService.virtualTryOn(req);
    console.log('Virtual Try-On Response:', data);
  }
}
