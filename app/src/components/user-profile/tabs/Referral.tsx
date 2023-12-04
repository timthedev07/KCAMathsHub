"use client";
import { TabItem } from "flowbite-react";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { InitReferral } from "../../InitReferral";
import { Session } from "next-auth";
import { trpc } from "../../../trpc/client";

interface ReferralTabProps {
  session: Session | null;
}

export const ReferralTab: FC<ReferralTabProps> = ({}) => {
  const { data } = useSession();
  const { data: referralData } = trpc.getReferralEntity.useQuery({
    userId: data?.user.id,
  });
  const users = referralData?.acceptedUsers;
  const link = referralData?.url;
  const referralCreated = !!referralData;

  return (
    <TabItem title="Referral">
      <div>
        <InitReferral userId={data?.user.id || ""} />
      </div>
    </TabItem>
  );
};
