import { Prisma } from "@prisma/client";

// Create a strongly typed `PostSelect` object with `satisfies`
const userSelect = {
  email: true,
  roles: { select: { name: true } },
  moderations: {
    include: {
      answer: {
        select: {
          question: { select: { categories: { select: { name: true } } } },
        },
      },
    },
    orderBy: { timestamp: "desc" },
  },
  answers: {
    include: {
      question: { select: { categories: { select: { name: true } } } },
    },
    orderBy: {
      timestamp: "desc",
    },
  },
} satisfies Prisma.UserSelect;

// Infer the resulting payload type
export type User = Prisma.UserGetPayload<{ select: typeof userSelect }>;
