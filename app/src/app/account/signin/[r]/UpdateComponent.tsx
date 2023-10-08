"use client";

import { FC, useEffect } from "react";
import { trpc } from "../../../../trpc/client";

interface UpdateComponentProps {
  r: string;
  userId: string;
}

export const UpdateComponent: FC<UpdateComponentProps> = ({ r, userId }) => {
  const accept = trpc.acceptReferral.useMutation().mutateAsync;

  useEffect(() => {
    (async () => {
      const a = await accept({
        referralId: r,
        userId,
      });
    })();
  }, [r, userId, accept]);

  return <div></div>;
};
