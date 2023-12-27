/*
  Warnings:

  - You are about to drop the column `answererReputation` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `inquirerReputation` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `answererReputation`,
    DROP COLUMN `inquirerReputation`,
    ADD COLUMN `credits` INTEGER NOT NULL DEFAULT 0;
