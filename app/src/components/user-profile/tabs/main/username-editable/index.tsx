"use client";
import { inferProcedureOutput } from "@trpc/server";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { DAYS_BETWEEN_USERNAME_UPDATE } from "../../../../../constants/updateIntervals";
import { updateIntervalCheck } from "../../../../../lib/updateIntervalCheck";
import { getUser } from "../../../../../server/crud/user/getUser";
import { WithRole } from "../../../../../types/next-auth";
import { Editable } from "./Editable";

export const spanBase = "py-1 px-2 font-bold text-xl font-mono";

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
