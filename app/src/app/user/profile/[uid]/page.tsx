import { NextPage } from "next";
import { getServerSession } from "../../../../lib/authoptions";
import { notFound, redirect } from "next/navigation";
import { getServerUser } from "../../../../server/crud/user/getUser";

interface Params {
  params: { uid: string; success: string | null | undefined };
}

const UserProfile: NextPage<Params> = async ({ params: { uid } }) => {
  const session = await getServerSession();

  if (session?.user && session.user.id === uid) {
    return redirect("/account/profile");
  }

  const u = await getServerUser(uid);
  if (!u) {
    notFound();
  }

  return <>{JSON.stringify(u, null, 2)}</>;
};

export default UserProfile;
