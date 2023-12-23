import { inferProcedureOutput } from "@trpc/server";
import { getModerations } from "../../server/crud/moderations/getModerations";

export type ModerationsListType = inferProcedureOutput<typeof getModerations>;

export type Arg = { mods: ModerationsListType; aid: string };
