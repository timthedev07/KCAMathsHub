import { Session } from "next-auth";
import { FC } from "react";
import { Editable } from "./Editable";

interface UsernameEditableProps {
  editable?: boolean;
  user: Session["user"];
}

export const spanBase = "font-bold text-xl";

export const UsernameEditable: FC<UsernameEditableProps> = ({
  editable = true,
  user,
}) => {
  if (!editable || (!!user.usernameLastUpdated && user.usernameLastUpdated))
    return <span className={spanBase}>{user.username}</span>;

  return <Editable user={user} />;
};
