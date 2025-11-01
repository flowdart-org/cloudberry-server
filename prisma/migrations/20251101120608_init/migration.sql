/*
  Warnings:

  - You are about to drop the column `actualPrice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `discountedPrice` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "actualPrice",
DROP COLUMN "discountedPrice",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 300;
