import { Prisma } from "@prisma/client";

// Create a strongly typed `PostSelect` object with `satisfies`
const userSelect = {
  email: true,
  roles: { select: { name: true } },
} satisfies Prisma.UserSelect;

// Infer the resulting payload type
type User = Prisma.UserGetPayload<{ select: typeof userSelect }>;
