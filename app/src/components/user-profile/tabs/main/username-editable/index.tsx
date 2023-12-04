"use client";
import { FC } from "react";
import { Editable } from "./Editable";
import { updateIntervalCheck } from "../../../../../lib/updateIntervalCheck";
import { DAYS_BETWEEN_USERNAME_UPDATE } from "../../../../../data/updateIntervals";
import { useSession } from "next-auth/react";

interface UsernameEditableProps {
  editable?: boolean;
}

export const spanBase = "py-1 px-2 font-bold text-xl font-mono";

export const UsernameEditable: FC<UsernameEditableProps> = ({
  editable = true,
}) => {
  const { data } = useSession();

  if (!data) return;

  const lastUpdate = data.user.usernameLastUpdated;
  const user = data.user;

  if (
    !editable ||
    (lastUpdate &&
      !updateIntervalCheck(lastUpdate.valueOf(), DAYS_BETWEEN_USERNAME_UPDATE))
  )
    return <span className={spanBase}>{user.username}</span>;

  return <Editable user={user} />;
};