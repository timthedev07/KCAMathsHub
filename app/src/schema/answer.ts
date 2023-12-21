import { z } from "zod";
import { contentSchema } from "./shared/content";

export const AnswerSchema = z.object({
  content: contentSchema,
  anonymous: z.boolean(),
});

export const AnswerSubmissionSchema = z
  .object({
    userId: z.string().min(1),
    attachmentIds: z.number().array(),
    questionId: z.string().min(1),
  })
  .merge(AnswerSchema);
