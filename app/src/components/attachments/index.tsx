import Image from "next/image";
import { FC } from "react";
import { Button } from "../reusable/Button";

interface AttachmentListProps {
  attachments: { name: string; imgUrl: string; size: number }[];
}

export const AttachmentList: FC<AttachmentListProps> = ({ attachments }) => {
  return (
    <ol className="w-full flex flex-col gap-4">
      {attachments.map((each) => (
        <li
          className={`flex items-center gap-3 py-5 shadow-2xl px-8 cursor-pointer transition duration-200 hover:bg-slate-400/[0.12] bg-slate-500/10 rounded-lg`}
          key={each.name + "_" + each.imgUrl}
        >
          <div className="w-14 h-14 relative">
            <Image
              src={each.imgUrl}
              alt={each.name}
              fill
              className="rounded-md object-cover object-center"
            />
          </div>
          <div className="flex flex-col justify-evenly h-full">
            <span className="font-semibold text-white/80 text-sm">
              {each.name}
            </span>
            <span className="text-xs text-white/60">{each.size}MB</span>
          </div>
          <div className="ml-auto">
            <Button>View File</Button>
          </div>
        </li>
      ))}
    </ol>
  );
};
