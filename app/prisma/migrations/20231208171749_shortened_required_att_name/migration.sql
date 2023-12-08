/*
  Warnings:

  - Made the column `name` on table `ImageAttachment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `ImageAttachment` MODIFY `name` VARCHAR(48) NOT NULL;
