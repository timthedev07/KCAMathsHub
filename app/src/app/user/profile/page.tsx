import { withAccessGuard } from "../../../lib/accessGuard";
import { WithSessionProps } from "../../../types/withSessionPage";
import { ProfileTabs } from "../../../components/user-profile/tabs";
import { NextPage } from "../../../types/nextpage";

const Profile: NextPage<WithSessionProps> = async ({ session }) => {
  return (
    <div className="my-6 mx-8 md:mx-24 rounded-lg">
      <ProfileTabs session={session} />
    </div>
  );
};

export default await withAccessGuard(Profile, [
  "inquirer",
  "admin",
  "answerer",
  "moderator",
]);
