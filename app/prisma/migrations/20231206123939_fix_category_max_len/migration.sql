/*
  Warnings:

  - You are about to alter the column `name` on the `QuestionCategory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(48)` to `VarChar(25)`.

*/
-- AlterTable
ALTER TABLE `QuestionCategory` MODIFY `name` VARCHAR(25) NOT NULL;
