import { contentSchema } from "./shared/content";
import { z } from "zod";

export const AnswerSchema = z.object({
  content: contentSchema,
});

export const AnswerSubmissionSchema = z
  .object({
    userId: z.string().min(1),
    attachmentIds: z.number().array(),
    questionId: z.string().min(1),
  })
  .merge(AnswerSchema);
