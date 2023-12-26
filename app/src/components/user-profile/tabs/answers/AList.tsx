import { inferProcedureOutput } from "@trpc/server";
import { FC } from "react";
import { getUserAnswers } from "../../../../server/crud/answers/getUserAnswers";
import { Status } from "../../../../types/TRPCQueryStatus";
import { LoadingSpin } from "../../../loading/loading-spin";
import { ProfileSubDisplay } from "../main/ProfileSubDisplay";
import { Answer } from "./Item";

interface AListProps {
  uid: string;
  className?: string;
  data?: inferProcedureOutput<typeof getUserAnswers>;
  status: Status;
}

export const AList: FC<AListProps> = ({ data, className = "", status }) => {
  return (
    <ProfileSubDisplay>
      {status === "loading" || !data ? (
        <LoadingSpin size="lg" />
      ) : (
        <div className={"flex flex-col gap-3 pt-4 " + className}>
          <h2 className="w-full text-center font-bold text-3xl my-8">
            Answers
          </h2>
          <ol className="last:border-b-0 flex flex-col">
            {data.map((each, ind) => (
              <div key={each.id}>
                <Answer answer={each} key={each.id} />
                {ind < data.length - 1 ? (
                  <hr className="h-[1px] border-0 bg-slate-400/30" />
                ) : null}
              </div>
            ))}
          </ol>
        </div>
      )}
    </ProfileSubDisplay>
  );
};
