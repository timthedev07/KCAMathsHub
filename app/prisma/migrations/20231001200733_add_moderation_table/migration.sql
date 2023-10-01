-- CreateTable
CREATE TABLE "Moderation" (
    "id" TEXT NOT NULL,
    "moderationComment" VARCHAR(5000),
    "approval" BOOLEAN NOT NULL DEFAULT false,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "moderatorId" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,

    CONSTRAINT "Moderation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Moderation" ADD CONSTRAINT "Moderation_moderatorId_fkey" FOREIGN KEY ("moderatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Moderation" ADD CONSTRAINT "Moderation_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
