-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('active', 'inactive');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'inactive';
