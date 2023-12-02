"use client";

import { Tooltip } from "flowbite-react";
import { FC, useState } from "react";
import { spanBase } from ".";
import { Session } from "next-auth";

interface EditableProps {
  user: Session["user"];
}

export const Editable: FC<EditableProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (isEditing) return <></>;

  return (
    <Tooltip
      content={`Double click to edit`}
      className="select-none"
      animation="duration-150"
    >
      <span
        className={`${spanBase} cursor-pointer transition duration-150 py-1 rounded-md px-2 select-none border-slate-500/10 hover:border-slate-500/30 hover:bg-slate-400/20`}
        onClick={(e) => {
          if (e.detail !== 2) return;
          setIsEditing(true);
        }}
      >
        {user.username}
      </span>
    </Tooltip>
  );
};
