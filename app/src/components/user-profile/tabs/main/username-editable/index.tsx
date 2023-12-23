"use client";
import { inferProcedureOutput } from "@trpc/server";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { FC } from "react";
import { DAYS_BETWEEN_USERNAME_UPDATE } from "../../../../../constants/updateIntervals";
import { updateIntervalCheck } from "../../../../../lib/updateIntervalCheck";
import { getUser } from "../../../../../server/crud/user/getUser";
import { WithRole } from "../../../../../types/next-auth";

export const spanBase = "py-1 px-2 font-bold text-xl font-mono";

const Editable = dynamic(async () => (await import("./Editable")).Editable, {
  ssr: false,
  loading: () => (
    <span className={spanBase.replace("font-mono", "text-center")}>...</span>
  ),
});

interface UsernameEditableProps {
  editable?: boolean;
  userData?: inferProcedureOutput<typeof getUser> | WithRole;
}

export const UsernameEditable: FC<UsernameEditableProps> = ({
  userData,
  editable = true,
}) => {
  const { data } = useSession();

  const lastUpdate = data ? data.user.usernameLastUpdated : null;

  if (
    !editable ||
    (lastUpdate &&
      !updateIntervalCheck(
        lastUpdate.valueOf(),
        DAYS_BETWEEN_USERNAME_UPDATE
      )) ||
    !userData
  )
    return (
      <span className={spanBase}>
        {userData ? userData.username : data?.user.username}
      </span>
    );

  return <Editable user={userData} />;
};
