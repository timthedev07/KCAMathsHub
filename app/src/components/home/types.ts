import { z } from "zod";
import { GetQSSchema } from "../../server/crud/questions/getQuestions";

export type Query = z.infer<typeof GetQSSchema>;
