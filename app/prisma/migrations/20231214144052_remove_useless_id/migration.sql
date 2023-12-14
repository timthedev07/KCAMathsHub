/*
  Warnings:

  - The primary key for the `QuestionCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `QuestionCategory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `_QuestionCategory` DROP FOREIGN KEY `_QuestionCategory_B_fkey`;

-- AlterTable
ALTER TABLE `QuestionCategory` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`name`);

-- AlterTable
ALTER TABLE `_QuestionCategory` MODIFY `B` VARCHAR(48) NOT NULL;

-- AddForeignKey
ALTER TABLE `_QuestionCategory` ADD CONSTRAINT `_QuestionCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `QuestionCategory`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;
