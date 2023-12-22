import { z } from "zod";
import { MODERATION_LIMIT } from "./constants";
import { editorValidation } from "./validations/editorValidation";

export const commentSchema = z
  .string()
  .refine(
    async (val) => {
      const res = editorValidation(val, MODERATION_LIMIT);
      return !(res === "exceeding");
    },
    {
      message: `Please don't write more than ${MODERATION_LIMIT[1]} characters`,
    }
  )
  .refine(
    (val) => {
      const res = editorValidation(val, MODERATION_LIMIT);
      return !(res === "few");
    },
    {
      message: "Please provide a more detailed comment",
    }
  );

export const ModerationFormSchema = z.object({
  anonymous: z.boolean(),
  moderationComment: commentSchema,
  approval: z.boolean(),
});

export const ModerationSubmissionSchema = z
  .object({
    moderatorId: z.string(),
    answerId: z.string(),
  })
  .merge(ModerationFormSchema);
