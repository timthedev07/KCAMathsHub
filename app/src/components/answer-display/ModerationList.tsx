import { FC } from "react";
import { ModerationsListType } from "./type";

interface ModerationListProps {
  moderations: ModerationsListType;
}

const ModerationList: FC<ModerationListProps> = ({ moderations }) => {
  return <ul></ul>;
};

export default ModerationList;
