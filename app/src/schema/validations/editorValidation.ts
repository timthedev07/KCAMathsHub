import { CONTENT_LIMIT, LimitType } from "../constants";

export const editorValidation = (
  s: string,
  limits: LimitType = CONTENT_LIMIT
): true | "few" | "exceeding" => {
  const l = s.replace(/[^a-zA-Z\d\s:]/, "").length;
  if (l > limits[1]) {
    return "exceeding";
  } else if (l < limits[0]) {
    return "few";
  }
  return true;
};
