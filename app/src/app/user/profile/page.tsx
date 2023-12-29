import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { LoadingSpin } from "../../../components/loading/loading-spin";
import { getServerSession } from "../../../lib/authoptions";
import { getMetadata } from "../../../lib/getMetadata";
import { NextPage } from "../../../types/nextpage";

export const metadata = getMetadata({
  title: "Profile",
  description: "Your profile",
});

const ProfileTabs = dynamic(
  () => import("../../../components/user-profile/tabs"),
  {
    ssr: false,
    loading: () => {
      return (
        <div className="h-[80vh]">
          <LoadingSpin size="md" />
        </div>
      );
    },
  }
);

const Profile: NextPage = async () => {
  const session = await getServerSession();

  if (!session?.user) redirect("/user/signin");

  return (
    <div className="my-6 mx-8 md:mx-24">
      <ProfileTabs isCurrUser user={session?.user} />
    </div>
  );
};

export default Profile;
