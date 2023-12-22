import { z } from "zod";
import { CONTENT_LIMIT } from "../constants";
import { editorValidation } from "../validations/editorValidation";

export const contentSchema = z
  .string()
  .refine(
    async (val) => {
      const res = editorValidation(val);
      return !(res === "exceeding");
    },
    {
      message: `Please don't write more than ${CONTENT_LIMIT[1]} characters`,
    }
  )
  .refine(
    (val) => {
      const res = editorValidation(val);
      return !(res === "few");
    },
    {
      message: "Please provide more detailed explanations",
    }
  );
