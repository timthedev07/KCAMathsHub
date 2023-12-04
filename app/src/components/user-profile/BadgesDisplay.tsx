import { FC } from "react";
import { RoleBadge } from "./RoleBadge";
import { Role } from "../../types/role";

interface BadgesDisplayProps {
  roles: Role[];
  center?: boolean;
  className?: string;
}

export const BadgesDisplay: FC<BadgesDisplayProps> = ({
  roles,
  className = "",
  center = false,
}) => {
  return (
    <ul
      className={`flex gap-2 flex-wrap px-2 ${
        center ? "justify-center" : ""
      } ${className}`}
    >
      {roles.toSorted().map((each) => (
        <RoleBadge role={each as any} key={each} />
      ))}
    </ul>
  );
};
