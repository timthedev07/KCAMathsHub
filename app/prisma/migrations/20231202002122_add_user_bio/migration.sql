-- AlterTable
ALTER TABLE `User` ADD COLUMN `bio` VARCHAR(150) NOT NULL DEFAULT '',
    ADD COLUMN `bioLastUpdated` DATETIME(3) NULL;
