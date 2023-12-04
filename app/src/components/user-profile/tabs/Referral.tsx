"use client";
import { TabItem } from "flowbite-react";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { InitReferral } from "../../InitReferral";
import { Session } from "next-auth";

interface ReferralTabProps {
  session: Session | null;
}

export const ReferralTab: FC<ReferralTabProps> = ({}) => {
  const { data } = useSession();

  return (
    <TabItem title="Referral">
      <div>
        <InitReferral userId={data?.user.id || ""} />
      </div>
    </TabItem>
  );
};
