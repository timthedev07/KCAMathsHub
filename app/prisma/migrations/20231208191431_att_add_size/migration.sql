/*
  Warnings:

  - Added the required column `size` to the `ImageAttachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ImageAttachment` ADD COLUMN `size` DOUBLE NOT NULL;
