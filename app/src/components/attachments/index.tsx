import Image from "next/image";
import { FC } from "react";

interface AttachmentListProps {
  attachments: { name: string; imgUrl: string }[];
}

export const AttachmentList: FC<AttachmentListProps> = ({ attachments }) => {
  return (
    <ol className="w-full flex flex-col">
      {attachments.map((each, ind) => (
        <li
          className={`flex gap-3 py-6 px-8 cursor-pointer transition duration-200 hover:bg-slate-400/[0.12] bg-slate-400/10 ${
            ind === 0
              ? "rounded-t-lg"
              : ind === attachments.length - 1
              ? "rounded-b-lg"
              : ""
          }`}
          key={each.name + "_" + each.imgUrl}
        >
          <div className="w-14 h-14 relative">
            <Image
              src={each.imgUrl}
              alt={each.name}
              fill
              className="rounded-md object-cover object-center"
            />
            <span>{each.name}</span>
          </div>
        </li>
      ))}
    </ol>
  );
};
