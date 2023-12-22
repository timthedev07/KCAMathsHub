import { FC } from "react";
import { ModerationsListType } from "./type";

interface ModerationListProps {
  moderations: ModerationsListType;
}

export const ModerationList: FC<ModerationListProps> = ({ moderations }) => {
  return <ul></ul>;
};
