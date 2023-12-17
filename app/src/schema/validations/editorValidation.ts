import { CONTENT_LIMIT } from "../vars";

export const editorValidation = (s: string): true | "few" | "exceeding" => {
  const l = s.replace(/[^a-zA-Z\d\s:]/, "").length;
  if (l > CONTENT_LIMIT[1]) {
    return "exceeding";
  } else if (l < CONTENT_LIMIT[0]) {
    return "few";
  }
  return true;
};
