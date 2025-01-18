/*
  Warnings:

  - Added the required column `status` to the `requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "houseNumber" DROP NOT NULL;

-- AlterTable
ALTER TABLE "requests" ADD COLUMN     "status" TEXT NOT NULL;
