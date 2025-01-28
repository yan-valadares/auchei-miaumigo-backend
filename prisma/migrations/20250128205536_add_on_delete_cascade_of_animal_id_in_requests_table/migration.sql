-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_animal_id_fkey";

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
