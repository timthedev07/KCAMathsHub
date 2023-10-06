"use client";

import { FC, useState } from "react";
import { trpc } from "../trpc/client";
import { Button } from "./reusable/Button";

interface InitReferralProps {
  userId: string;
}

export const InitReferral: FC<InitReferralProps> = ({ userId }) => {
  const [link, setLink] = useState<string | null>(null);
  const initReferral = trpc.initReferral.useMutation().mutateAsync;
  const { isLoading, data } = trpc.getReferralId.useQuery({
    userId,
  });

  return (
    <div className="border border-cyan-500 rounded-md p-12 flex flex-col items-center justify-between">
      {isLoading ? (
        "..."
      ) : data === false ? (
        <Button
          className=""
          onClick={async () => {
            const res = await initReferral({ userId });
            setLink(res);
          }}
        >
          Create referral link
        </Button>
      ) : (
        ""
      )}
      <span>{link || "No Link Yet"}</span>
    </div>
  );
};
