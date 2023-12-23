import { FC } from "react";
import { ModerationsListType } from "./type";

interface ModerationListProps {
  moderations: ModerationsListType;
  closeModerations: () => void;
}

const ModerationList: FC<ModerationListProps> = ({
  moderations,
  closeModerations,
}) => {
  return (
    <div className="w-full h-screen fixed z-20 bg-black/70 flex justify-center items-center">
      <ul className="">
        {moderations.map(
          ({ id, anonymous, approval, moderationComment, moderator }) => (
            <li key={id} className=""></li>
          )
        )}
      </ul>
    </div>
  );
};

export default ModerationList;
