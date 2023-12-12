/*
  Warnings:

  - A unique constraint covering the columns `[objKey]` on the table `ImageAttachment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ImageAttachment_objKey_key` ON `ImageAttachment`(`objKey`);
