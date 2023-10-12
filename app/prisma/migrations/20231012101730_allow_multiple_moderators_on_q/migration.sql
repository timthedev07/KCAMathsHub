/*
  Warnings:

  - You are about to drop the column `moderatorId` on the `Answer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Answer` DROP FOREIGN KEY `Answer_moderatorId_fkey`;

-- AlterTable
ALTER TABLE `Answer` DROP COLUMN `moderatorId`;
