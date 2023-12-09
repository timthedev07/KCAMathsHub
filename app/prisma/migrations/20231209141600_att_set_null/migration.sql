-- DropForeignKey
ALTER TABLE `ImageAttachment` DROP FOREIGN KEY `ImageAttachment_answerId_fkey`;

-- DropForeignKey
ALTER TABLE `ImageAttachment` DROP FOREIGN KEY `ImageAttachment_questionId_fkey`;

-- AddForeignKey
ALTER TABLE `ImageAttachment` ADD CONSTRAINT `ImageAttachment_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImageAttachment` ADD CONSTRAINT `ImageAttachment_answerId_fkey` FOREIGN KEY (`answerId`) REFERENCES `Answer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
