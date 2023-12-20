import { inferProcedureOutput } from "@trpc/server";
import { getQuestions } from "../../../server/crud/questions/getQuestions";

export type QueryOutput = inferProcedureOutput<typeof getQuestions>;

export interface InfiniteScrollingDisplayProps {
  initialData: QueryOutput["questions"];
  nextCursor: QueryOutput["nextCursor"];
}
