import { NextPage } from "next";
import { withAccessGuard } from "../../../lib/accessGuard";
import { WithSessionProps } from "../../../types/withSessionPage";

const AdminDashboard: NextPage<WithSessionProps> = () => {
  return <></>;
};

export default await withAccessGuard(AdminDashboard, "admin");
