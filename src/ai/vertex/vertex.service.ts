import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleAuth } from 'google-auth-library';

interface Predictions {
  mimeType: 'image/png';
  bytesBase64Encoded: string;
}

export interface TryOnRequest {
  personImage: { base64: string };
  productImages: { base64: string }[];
}

export interface TryOnResponse {
  predictions: Predictions[];
}

@Injectable()
export class VertexService {
  private readonly PROJECT_ID: string;
  private readonly REGION: string;
  private readonly MODEL_ID: string;
  private readonly API_KEY: string;
  private readonly KEY_PATH: string = 'keys/gcp-key.json';

  constructor() {
    const configService = new ConfigService();
    this.REGION = configService.getOrThrow<string>('GCP_REGION');
    this.PROJECT_ID = configService.getOrThrow<string>('GCP_PROJECT_ID');
    this.MODEL_ID = configService.getOrThrow<string>('GCP_VERTEX_MODEL_ID');
    this.API_KEY = configService.getOrThrow<string>('GCP_API_KEY');
  }

  private async _getAccessToken(): Promise<string> {
    const auth = new GoogleAuth({
      clientOptions: {
        keyFile: this.KEY_PATH,
        apiKey: this.API_KEY,
      },
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });
    const client = await auth.getClient();
    const { token } = await client.getAccessToken();
    return token!;
  }

  async virtualTryOn(payload: TryOnRequest): Promise<TryOnResponse> {
    const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/${this.PROJECT_ID}/locations/${this.REGION}/publishers/google/models/virtual-try-on-preview-08-04:predict`;

    const payloadWrapper = {
      instances: [
        {
          personImage: {
            image: {
              bytesBase64Encoded: payload.personImage.base64,
            },
          },
          productImages: [
            ...payload.productImages.map((productImage) => ({
              image: {
                bytesBase64Encoded: productImage.base64,
              },
            })),
          ],
        },
      ],
      parameters: {
        sampleCount: 1,
      },
    };

    const { data } = await axios.post<TryOnResponse>(url, payloadWrapper, {
      headers: {
        Authorization: `Bearer ${await this._getAccessToken()}`,
        'Content-Type': 'application/json',
      },
    });

    return data;
  }
}
