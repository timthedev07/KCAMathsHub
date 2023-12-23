import { inferProcedureOutput } from "@trpc/server";
import { getQuestions } from "../../../server/crud/questions/getQuestions";
import { Query } from "../types";

export type QueryOutput = inferProcedureOutput<typeof getQuestions>;

export interface InfiniteScrollingDisplayProps {
  initialData: QueryOutput["questions"];
  query: Partial<Query>;
}
