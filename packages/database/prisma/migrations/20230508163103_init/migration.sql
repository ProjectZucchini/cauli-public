-- CreateTable
CREATE TABLE `SlackWorkspace` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teamId` VARCHAR(191) NOT NULL,
    `installation` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `SlackWorkspace_teamId_key`(`teamId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
