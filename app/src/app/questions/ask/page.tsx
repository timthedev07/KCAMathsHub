import { FC } from "react";
import { QuestionForm } from "../../../components/QuestionForm";
import { WithSessionProps } from "../../../types/withSessionPage";
import { withAccessGuard } from "../../../lib/accessGuard";

const AskPage: FC<WithSessionProps> = async ({ session }) => {
  const u = session?.user;

  return (
    <div>
      <QuestionForm userId={u.id} />
    </div>
  );
};

export default await withAccessGuard(AskPage, ["inquirer"]);
