import { z } from "zod";

export const titleSearchValidation = z
  .string()
  .trim()
  .min(5, "Type in at least 5 characters")
  .max(48)
  .transform((v) => {
    return v
      .toLowerCase()
      .replaceAll(/[^-\w\d\s:]/gi, "")
      .replaceAll(/(-)\1+/gi, "-")
      .trim();
  });

export const userSearchValidation = z
  .string()
  .trim()
  .max(32)
  .transform((v) => {
    return v.toLowerCase().replaceAll(/\s/gi, "-").trim();
  });
