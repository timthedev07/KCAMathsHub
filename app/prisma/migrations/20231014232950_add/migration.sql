-- CreateTable
CREATE TABLE `QuestionCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(16) NOT NULL,

    UNIQUE INDEX `QuestionCategory_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_QuestionCategory` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_QuestionCategory_AB_unique`(`A`, `B`),
    INDEX `_QuestionCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_QuestionCategory` ADD CONSTRAINT `_QuestionCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QuestionCategory` ADD CONSTRAINT `_QuestionCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `QuestionCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
