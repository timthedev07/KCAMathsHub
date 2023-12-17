-- AlterTable
ALTER TABLE `Answer` ADD COLUMN `anonymous` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Moderation` ADD COLUMN `anonymous` BOOLEAN NOT NULL DEFAULT false;
