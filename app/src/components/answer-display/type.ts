import { inferProcedureOutput } from "@trpc/server";
import { getQuestionAnswers } from "../../server/crud/answers/getQuestionAnswers";

export type ModerationsListType = inferProcedureOutput<
  typeof getQuestionAnswers
>["answers"][number]["moderations"];
