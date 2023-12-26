import { z } from "zod";
import { GetQSSchema } from "../../server/crud/questions/getQuestions";
import { NextPageParams } from "../../types/nextPageParam";

export type Query = z.infer<typeof GetQSSchema>;

export type HomePageParams = NextPageParams<
  {},
  "q" | "k" | "c" | "u" | "y" | "s" | "a"
>;
