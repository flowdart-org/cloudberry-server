/*
  Warnings:

  - You are about to drop the column `heroImage` on the `LandingPage` table. All the data in the column will be lost.
  - You are about to drop the column `addressLabel` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `addressLine1` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `addressLine2` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `courierName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `recipientName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `recipientPhone` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `trackingNumber` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `trackingUrl` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LandingPage" DROP COLUMN "heroImage";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "addressLabel",
DROP COLUMN "addressLine1",
DROP COLUMN "addressLine2",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "courierName",
DROP COLUMN "postalCode",
DROP COLUMN "recipientName",
DROP COLUMN "recipientPhone",
DROP COLUMN "state",
DROP COLUMN "trackingNumber",
DROP COLUMN "trackingUrl";
