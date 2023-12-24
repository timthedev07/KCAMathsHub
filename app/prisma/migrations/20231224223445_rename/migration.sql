/*
  Warnings:

  - You are about to drop the column `category` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Question` DROP COLUMN `category`,
    ADD COLUMN `studentStage` VARCHAR(191) NULL;
