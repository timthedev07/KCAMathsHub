"use client";

import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { NextPage } from "../../../types/nextpage";

const ProfileTabs = dynamic(
  () => import("../../../components/user-profile/tabs"),
  {
    ssr: false,
  }
);

const Profile: NextPage = () => {
  const { data: session } = useSession({ required: true });

  if (!session?.user) {
    return;
  }

  return (
    <div className="my-6 mx-8 md:mx-24">
      <ProfileTabs isCurrUser user={session.user} />
    </div>
  );
};

export default Profile;
