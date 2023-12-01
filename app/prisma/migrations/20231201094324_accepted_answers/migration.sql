/*
  Warnings:

  - You are about to drop the column `helpful` on the `Answer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Answer` DROP COLUMN `helpful`,
    ADD COLUMN `accepted` BOOLEAN NULL;

-- AlterTable
ALTER TABLE `Question` ADD COLUMN `answered` BOOLEAN NOT NULL DEFAULT false;
