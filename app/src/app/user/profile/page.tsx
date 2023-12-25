"use client";

import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { LoadingSpin } from "../../../components/loading/loading-spin";
import { NextPage } from "../../../types/nextpage";

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

const Profile: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-[80vh]">
        <LoadingSpin size="md" />
      </div>
    );
  }

  if (!session) {
    notFound();
  }

  return (
    <div className="my-6 mx-8 md:mx-24">
      <ProfileTabs isCurrUser user={session.user} />
    </div>
  );
};

export default Profile;
