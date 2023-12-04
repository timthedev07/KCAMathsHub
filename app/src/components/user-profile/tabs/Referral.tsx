"use client";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { trpc } from "../../../trpc/client";
import { Button } from "../../reusable/Button";
import { viewPanelBase } from ".";
import { LoadingSpin } from "../../LoadingSpin";

export const ReferralTab: FC = ({}) => {
  const { data, status } = useSession();
  const { data: referralData } = trpc.getReferralEntity.useQuery({
    userId: data?.user.id,
  });
  const { getReferralEntity } = trpc.useUtils();
  const initReferral = trpc.initReferral.useMutation({
    onSuccess: async () => {
      getReferralEntity.invalidate();
    },
  }).mutateAsync;

  if (status === "loading") {
    return (
      <div className={`${viewPanelBase} w-full h-[70vh]`}>
        <LoadingSpin size="md" />
      </div>
    );
  }
  const u = data?.user!;

  const users = referralData?.acceptedUsers;
  const link = referralData?.url;
  const referralCreated = !!referralData;

  return (
    <div
      className={`${viewPanelBase} w-full h-[70vh] flex gap-4 flex-col justify-center items-center`}
    >
      {link ? <div>{link}</div> : null}
      {link ? (
        <Button
          color="cyan"
          onClick={() => {
            navigator.clipboard.writeText(link);
          }}
        >
          Copy Referral Link
        </Button>
      ) : null}
      {!referralCreated ? (
        <Button
          className=""
          onClick={async () => {
            await initReferral({ userId: u.id });
          }}
        >
          Create referral link
        </Button>
      ) : null}
    </div>
  );
};
