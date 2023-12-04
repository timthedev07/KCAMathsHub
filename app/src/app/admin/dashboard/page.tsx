import { withAccessGuard } from "../../../lib/accessGuard";
import { NextPage } from "../../../types/nextpage";
import { WithSessionProps } from "../../../types/withSessionPage";

const AdminDashboard: NextPage<WithSessionProps> = () => {
  return <></>;
};

export default await withAccessGuard(AdminDashboard, ["admin"]);
