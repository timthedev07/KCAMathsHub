"use client";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { InitReferral } from "../../InitReferral";
import { trpc } from "../../../trpc/client";
import { Session } from "next-auth";

interface ReferralTabProps {
  session: Session | null;
}

export const ReferralTab: FC<ReferralTabProps> = ({ session }) => {
  const { data } = useSession();
  const { data: referralData } = trpc.getReferralEntity.useQuery({
    userId: data?.user.id,
  });
  const users = referralData?.acceptedUsers;
  const link = referralData?.url;
  const referralCreated = !!referralData;

  return (
    <div>
      <InitReferral userId={data?.user.id || ""} />
    </div>
  );
};
