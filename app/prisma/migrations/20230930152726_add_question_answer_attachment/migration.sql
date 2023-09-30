-- CreateTable
CREATE TABLE "ImageAttachment" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128),
    "imgUrl" TEXT NOT NULL,
    "questionId" TEXT,
    "answerId" TEXT,

    CONSTRAINT "ImageAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(128) NOT NULL,
    "content" VARCHAR(5000) NOT NULL,
    "questionerId" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "content" VARCHAR(5000) NOT NULL,
    "helpful" BOOLEAN,
    "moderated" BOOLEAN NOT NULL DEFAULT false,
    "answererId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "moderatorId" TEXT,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Answer_questionId_key" ON "Answer"("questionId");

-- AddForeignKey
ALTER TABLE "ImageAttachment" ADD CONSTRAINT "ImageAttachment_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageAttachment" ADD CONSTRAINT "ImageAttachment_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_questionerId_fkey" FOREIGN KEY ("questionerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_answererId_fkey" FOREIGN KEY ("answererId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_moderatorId_fkey" FOREIGN KEY ("moderatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
