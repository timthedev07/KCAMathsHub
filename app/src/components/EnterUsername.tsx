"use client";
import { FC, useState } from "react";
import { trpc } from "../trpc/client";
import { useRouter } from "next/navigation";

interface EnterUsernameProps {
  id: string;
}

export const EnterUsername: FC<EnterUsernameProps> = ({ id }) => {
  const [username, setUname] = useState<string>("");
  const router = useRouter();
  const mutateUname = trpc.updateUsername.useMutation().mutate;

  return (
    <div>
      <input
        value={username}
        onChange={(e) => {
          setUname(e.target.value);
        }}
        placeholder="Enter username"
      />
      <button
        onClick={() => {
          mutateUname(
            { id, username },
            {
              onSuccess: () => {
                router.push("/account/profile");
              },
              onError: (e) => {
                console.log(e.message);
                router.push("/account/profile");
              },
            }
          );
        }}
      >
        Set username
      </button>
    </div>
  );
};
