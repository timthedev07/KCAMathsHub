"use client";

import { FC, useEffect } from "react";
import { trpc } from "../../../../trpc/client";
import { useRouter } from "next/navigation";

interface UpdateComponentProps {
  r: string;
  userId: string;
}

export const UpdateComponent: FC<UpdateComponentProps> = ({ r, userId }) => {
  const accept = trpc.acceptReferral.useMutation().mutateAsync;
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      try {
        await accept({
          referralId: r,
          userId,
        });
        push("/");
      } catch (err: any) {
        push(`/error?err=${encodeURIComponent(err.message)}`);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div></div>;
};
