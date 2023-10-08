-- DropForeignKey
ALTER TABLE `Answer` DROP FOREIGN KEY `Answer_answererId_fkey`;

-- DropForeignKey
ALTER TABLE `Answer` DROP FOREIGN KEY `Answer_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `ImageAttachment` DROP FOREIGN KEY `ImageAttachment_answerId_fkey`;

-- DropForeignKey
ALTER TABLE `ImageAttachment` DROP FOREIGN KEY `ImageAttachment_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `Moderation` DROP FOREIGN KEY `Moderation_answerId_fkey`;

-- DropForeignKey
ALTER TABLE `Moderation` DROP FOREIGN KEY `Moderation_moderatorId_fkey`;

-- DropForeignKey
ALTER TABLE `Question` DROP FOREIGN KEY `Question_questionerId_fkey`;

-- DropForeignKey
ALTER TABLE `Referral` DROP FOREIGN KEY `Referral_userId_fkey`;

-- AlterTable
ALTER TABLE `Answer` MODIFY `answererId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Moderation` MODIFY `moderatorId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Question` MODIFY `questionerId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `ImageAttachment` ADD CONSTRAINT `ImageAttachment_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImageAttachment` ADD CONSTRAINT `ImageAttachment_answerId_fkey` FOREIGN KEY (`answerId`) REFERENCES `Answer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_questionerId_fkey` FOREIGN KEY (`questionerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_answererId_fkey` FOREIGN KEY (`answererId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Moderation` ADD CONSTRAINT `Moderation_moderatorId_fkey` FOREIGN KEY (`moderatorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Moderation` ADD CONSTRAINT `Moderation_answerId_fkey` FOREIGN KEY (`answerId`) REFERENCES `Answer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Referral` ADD CONSTRAINT `Referral_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
