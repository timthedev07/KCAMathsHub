import { NextPage } from "next";
import { withAccessGuard } from "../../../lib/accessGuard";
import { WithSessionProps } from "../../../types/withSessionPage";

const Profile: NextPage<WithSessionProps> = async ({ session }) => {
  const u = session?.user;

  return <div className="p-32">{JSON.stringify(u, null, 2)}</div>;
};

export default await withAccessGuard(Profile, "inquirer");
