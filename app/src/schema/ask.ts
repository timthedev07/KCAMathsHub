import { z } from "zod";
import {
  CONTENT_LIMIT,
  TITLE_LIMIT,
} from "../server/crud/questions/askQuestion";
import { editorValidation } from "./validations/editorValidation";

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
  content: z
    .string()
    .refine(
      async (val) => {
        const res = editorValidation(val);

        if (res === "exceeding") {
          return false;
        }
        return true;
      },
      {
        message: `Please don't write more than ${CONTENT_LIMIT[1]} characters`,
      }
    )
    .refine(
      (val) => {
        const res = editorValidation(val);

        if (res === "few") {
          return false;
        }
        return true;
      },
      {
        message: "Please provide more details of the question",
      }
    ),
  categories: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
});

export type AskSchemaType = z.infer<typeof AskSchema>;

export const AskSubmissionSchema = z
  .object({
    anonymous: z.boolean(),
    userId: z.string().min(1),
    attachmentIds: z.number().array(),
  })
  .merge(AskSchema);
