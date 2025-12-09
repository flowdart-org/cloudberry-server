import { LandingPage } from '@/landing-page/entities/landing-page.entity';

export interface ILandingPageRepository {
  get(): Promise<LandingPage | null>;
  update(data: Partial<LandingPage>): Promise<LandingPage>;
}
