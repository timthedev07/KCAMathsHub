-- AlterTable
ALTER TABLE `Answer` ADD COLUMN `edited` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Question` ADD COLUMN `edited` BOOLEAN NOT NULL DEFAULT false;
