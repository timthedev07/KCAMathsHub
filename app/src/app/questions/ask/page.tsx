import { FC } from "react";
import { QuestionForm } from "../../../components/QuestionForm";
import { WithSessionProps } from "../../../types/withSessionPage";
import { withAccessGuard } from "../../../lib/accessGuard";

const AskPage: FC<WithSessionProps> = async ({ session }) => {
  const u = session?.user;

  return (
    <div className="flex flex-col">
      <h1 className="px-2 md:px-8 lg:px-16 mt-16 w-full text-start text-4xl font-semibold">
        Ask a Question
      </h1>
      <QuestionForm userId={u.id} />
    </div>
  );
};

export default await withAccessGuard(AskPage, ["inquirer"]);
