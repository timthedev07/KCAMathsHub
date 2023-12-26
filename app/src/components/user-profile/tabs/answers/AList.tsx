import { FC } from "react";
import { trpc } from "../../../../trpc/client";
import { LoadingSpin } from "../../../loading/loading-spin";
import { ProfileSubDisplay } from "../main/ProfileSubDisplay";
import { Answer } from "./Item";

interface QListProps {
  uid: string;
  className?: string;
}

export const AList: FC<QListProps> = ({ uid, className = "" }) => {
  const { data, status } = trpc.getUserAnswers.useQuery({ uid });

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
