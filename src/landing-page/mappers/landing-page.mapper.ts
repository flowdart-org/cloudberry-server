import { LandingPage as PrismaLandingPage } from '@prisma/client';

import { LandingPage } from '@/landing-page/entities/landing-page.entity';

export class LandingPageMapper {
  static toEntity(doc: PrismaLandingPage): LandingPage {
    return {
      id: doc.id,
      heroTitle: doc.heroTitle,
      heroSubtitle: doc.heroSubtitle,
      topCategoryIds: doc.topCategoryIds ?? [],
      topProductIds: doc.topProductIds ?? [],
      sections: Array.isArray(doc.sections) ? doc.sections : [],
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
