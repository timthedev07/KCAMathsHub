import { z } from "zod";
import { contentSchema } from "./shared/content";
import { TITLE_LIMIT } from "./vars";

export const AskSchema = z.object({
  title: z
    .string()
    .min(
      TITLE_LIMIT[0],
      `The title must be at least ${TITLE_LIMIT[0]} characters`
    )
    .max(
      TITLE_LIMIT[1],
      `The title can be at most ${TITLE_LIMIT[1]} characters`
    ),
  content: contentSchema,
  categories: z
    .array(z.string())
    .min(1, { message: "Please provide at least 1 category." }),
  anonymous: z.boolean(),
});

export type AskSchemaType = z.infer<typeof AskSchema>;

export const AskSubmissionSchema = z
  .object({
    userId: z.string().min(1),
    attachmentIds: z.number().array(),
  })
  .merge(AskSchema);
