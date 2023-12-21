/*
  Warnings:

  - You are about to drop the column `edited` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `edited` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Answer` DROP COLUMN `edited`,
    ADD COLUMN `editedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Question` DROP COLUMN `edited`,
    ADD COLUMN `editedAt` DATETIME(3) NULL;
