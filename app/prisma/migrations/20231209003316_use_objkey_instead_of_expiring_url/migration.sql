/*
  Warnings:

  - You are about to drop the column `imgUrl` on the `ImageAttachment` table. All the data in the column will be lost.
  - Added the required column `objKey` to the `ImageAttachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ImageAttachment` DROP COLUMN `imgUrl`,
    ADD COLUMN `objKey` VARCHAR(191) NOT NULL;
