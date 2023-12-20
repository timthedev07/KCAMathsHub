import { notFound, redirect } from "next/navigation";
import { ProfileTabs } from "../../../../components/user-profile/tabs";
import { getServerSession } from "../../../../lib/authoptions";
import { getServerUser } from "../../../../server/crud/user/getUser";
import { NextPage } from "../../../../types/nextpage";

interface Params {
  params: { username: string; success: string | null | undefined };
}

const UserProfile: NextPage<Params> = async ({ params: { username } }) => {
  const session = await getServerSession();

  if (session?.user && session.user.id === username) {
    return redirect("/user/profile");
  }

  const u = await getServerUser(username);

  if (!u) {
    notFound();
  }

  return (
    <div className="my-6 mx-8 md:mx-24">
      <ProfileTabs isCurrUser={false} user={u} />
    </div>
  );
};

export default UserProfile;
