-- AlterTable
ALTER TABLE `User` ADD COLUMN `acceptedReferralId` VARCHAR(191) NULL,
    ADD COLUMN `referralId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_acceptedReferralId_fkey` FOREIGN KEY (`acceptedReferralId`) REFERENCES `Referral`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
