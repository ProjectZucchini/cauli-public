-- CreateTable
CREATE TABLE `ApiKey` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `apiKey` VARCHAR(191) NOT NULL,
    `organizationId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `slackWorkspaceId` INTEGER NOT NULL,

    UNIQUE INDEX `ApiKey_slackWorkspaceId_key`(`slackWorkspaceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ApiKey` ADD CONSTRAINT `ApiKey_slackWorkspaceId_fkey` FOREIGN KEY (`slackWorkspaceId`) REFERENCES `SlackWorkspace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
