import { ProfileTabs } from "../../../components/user-profile/tabs";
import { withAccessGuard } from "../../../lib/accessGuard";
import { NextPage } from "../../../types/nextpage";
import { WithSessionProps } from "../../../types/withSessionPage";

const Profile: NextPage<WithSessionProps> = async ({ session }) => {
  return (
    <div className="my-6 mx-8 md:mx-24">
      <ProfileTabs isCurrUser user={session!.user} />
    </div>
  );
};

export default await withAccessGuard(Profile, [
  "inquirer",
  "admin",
  "answerer",
  "moderator",
]);
