import { NextPage } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Profile: NextPage = async () => {
  const u = (await getServerSession(authOptions))?.user;

  return <div className="p-32">{JSON.stringify(u, null, 2)}</div>;
};

export default Profile;
