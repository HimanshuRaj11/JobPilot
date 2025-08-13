/*
  Warnings:

  - You are about to drop the column `domain` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropIndex
DROP INDEX "public"."Company_domain_key";

-- AlterTable
ALTER TABLE "public"."Company" DROP COLUMN "domain",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "established" TIMESTAMP(3),
ADD COLUMN     "industry" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "size" TEXT,
ADD COLUMN     "socialLinks" TEXT,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "websiteUrl" TEXT;

-- AlterTable
ALTER TABLE "public"."Job" ADD COLUMN     "benefits" TEXT,
ADD COLUMN     "employmentType" TEXT,
ADD COLUMN     "experienceLevel" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "remote" BOOLEAN DEFAULT false,
ADD COLUMN     "requirements" TEXT,
ADD COLUMN     "role" TEXT,
ADD COLUMN     "skills" TEXT;

-- DropTable
DROP TABLE "public"."Account";

-- DropTable
DROP TABLE "public"."Session";

-- DropTable
DROP TABLE "public"."VerificationToken";
