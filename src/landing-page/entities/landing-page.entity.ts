export class LandingPage {
  id: string;

  heroImage: string | null;
  heroTitle: string | null;
  heroSubtitle: string | null;

  topCategoryIds: string[];
  topProductIds: string[];

  sections: any[];

  createdAt: Date;
  updatedAt: Date;
}
