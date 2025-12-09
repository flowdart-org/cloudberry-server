-- CreateTable
CREATE TABLE "LandingPage" (
    "id" TEXT NOT NULL,
    "heroImage" TEXT,
    "heroTitle" TEXT,
    "heroSubtitle" TEXT,
    "topCategoryIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "topProductIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "sections" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LandingPage_pkey" PRIMARY KEY ("id")
);
