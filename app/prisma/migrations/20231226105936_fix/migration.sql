/*
  Warnings:

  - Made the column `accepted` on table `Answer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Answer` MODIFY `accepted` BOOLEAN NOT NULL DEFAULT false;
