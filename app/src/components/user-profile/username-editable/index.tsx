import { Session } from "next-auth";
import { FC } from "react";
import { Editable } from "./Editable";
import { updateIntervalCheck } from "../../../lib/updateIntervalCheck";
import { DAYS_BETWEEN_USERNAME_UPDATE } from "../../../data/updateIntervals";

interface UsernameEditableProps {
  editable?: boolean;
  user: Session["user"];
}

export const spanBase = "font-bold text-xl";

export const UsernameEditable: FC<UsernameEditableProps> = ({
  editable = true,
  user,
}) => {
  if (
    !editable ||
    !updateIntervalCheck(
      user.usernameLastUpdated ? user.usernameLastUpdated.valueOf() : undefined,
      DAYS_BETWEEN_USERNAME_UPDATE
    )
  )
    return <span className={spanBase}>{user.username}</span>;

  return <Editable user={user} />;
};
