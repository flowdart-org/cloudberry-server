-- CreateEnum
CREATE TYPE "UserGender" AS ENUM ('male', 'female', 'other');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gender" TEXT;
