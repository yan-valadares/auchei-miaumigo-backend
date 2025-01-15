/*
  Warnings:

  - A unique constraint covering the columns `[tutor_id]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ngo_id]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "ngo_id" TEXT,
ADD COLUMN     "tutor_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "addresses_tutor_id_key" ON "addresses"("tutor_id");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_ngo_id_key" ON "addresses"("ngo_id");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "tutors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_ngo_id_fkey" FOREIGN KEY ("ngo_id") REFERENCES "ngos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
