import { z } from "zod";
import { CONTENT_LIMIT } from "../constants";
import { editorValidation } from "../validations/editorValidation";

export const contentSchema = z
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
      message: "Please provide more detailed explanations",
    }
  );
