"use client";
import { inferProcedureOutput } from "@trpc/server";
import { FC } from "react";
import { getQuestions } from "../../server/crud/questions/getQuestions";
import { Input } from "../reusable/Input";
import { InfiniteScrollingDisplay } from "./questions-display/InfiniteScrollingDisplay";

type Props = {
  questions: inferProcedureOutput<typeof getQuestions>["questions"];
};

export const PageDisplay: FC<Props> = ({ questions }) => {
  return (
    <div className="flex lg:flex-row flex-col">
      <aside className="lg:w-3/12 h-64 border-b lg:border-r border-slate-600/20 lg:min-h-[90vh] py-8 px-4">
        <Input />
      </aside>
      <div className="w-full md:w-9/12 md:mx-auto lg:mx-[unset] lg:w-1/2 flex flex-col py-8 px-12 md:px-12 lg:px-16 gap-4 items-center">
        <InfiniteScrollingDisplay query={{}} initialData={questions} />
      </div>
      <aside className="w-3/12 border-l border-slate-600/20 min-h-[90vh] hidden lg:block"></aside>
    </div>
  );
};
