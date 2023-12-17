import { notFound, redirect } from "next/navigation";
import { getServerSession } from "../../../../lib/authoptions";
import { getServerUser } from "../../../../server/crud/user/getUser";
import { NextPage } from "../../../../types/nextpage";

interface Params {
  params: { uid: string; success: string | null | undefined };
}

const UserProfile: NextPage<Params> = async ({ params: { uid } }) => {
  const session = await getServerSession();

  if (session?.user && session.user.id === uid) {
    return redirect("/user/profile");
  }

  const u = await getServerUser(uid);
  if (!u) {
    notFound();
  }

  return <>{JSON.stringify(u, null, 2)}</>;
};

export default UserProfile;
