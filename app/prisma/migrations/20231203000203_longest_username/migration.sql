/*
  Warnings:

  - You are about to alter the column `username` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(16)`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `username` VARCHAR(16) NOT NULL;
