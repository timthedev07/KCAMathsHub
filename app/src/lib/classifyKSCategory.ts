import { StudentStage } from "../types/StudentStage";
import { getCurrYear } from "./getCurrYear";

export const classifyKSCategory = (
  userJoinedDate: Date,
  userJoinedYear: number
): StudentStage => {
  const curr = getCurrYear(userJoinedDate, userJoinedYear);

  if (curr <= 6) {
    return "Primary";
  } else if (curr < 10) {
    return "KS3";
  } else if (curr < 12) {
    return "KS4";
  } else {
    return "KS5";
  }
};
