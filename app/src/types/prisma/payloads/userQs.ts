import { Prisma } from "@prisma/client";

export const userQuestionListDisplaySelect = {
  answered: true,
  studentStage: true,
  title: true,
  timestamp: true,
  id: true,
  categories: {
    select: {
      name: true,
    },
  },
  anonymous: true,
  boosted: true,
} satisfies Prisma.QuestionSelect;

export type UserQuestionListDisplay = Prisma.QuestionGetPayload<{
  select: typeof userQuestionListDisplaySelect;
}>;
