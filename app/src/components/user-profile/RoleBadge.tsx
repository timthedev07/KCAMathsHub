import { FC } from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IconType } from "react-icons";
import { Role } from "../../types/role";

const iconMap: Record<Role, IconType> = {
  admin: MdAdminPanelSettings,
  answerer: FaChalkboardTeacher,
  inquirer: FaPersonCircleQuestion,
  moderator: MdAddModerator,
};

interface RoleBadgeProps {
  role: Role;
}

export const RoleBadge: FC<RoleBadgeProps> = ({ role }) => {
  const Icon = iconMap[role];
  return (
    <div className="transition duration-200 cursor-pointer hover:bg-slate-400/30 flex bg-blur shadow-lg bg-slate-600/20 gap-2 border border-slate-300/40 rounded-md justify-center items-center py-1 w-min px-3">
      <Icon className="w-4" />
      <span className="capitalize text-sm">{role}</span>
    </div>
  );
};
