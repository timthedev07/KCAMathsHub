import Image from "next/image";
import { FC } from "react";
import { Button } from "../reusable/Button";
import { WithExpandedImg } from "./ExpandedImg";

interface AttachmentListProps {
  attachments: { name: string; url: string; size: number }[];
}

export const AttachmentList: FC<AttachmentListProps> = ({ attachments }) => {
  return (
    <ol className="w-full flex flex-col gap-4">
      {attachments.map(({ url, name, size }) => (
        <li
          className={`flex items-center gap-3 py-5 shadow-2xl px-8 cursor-pointer transition duration-200 hover:bg-slate-400/[0.12] bg-slate-500/10 rounded-lg`}
          key={name + "_" + url}
        >
          <div className="w-14 h-14 relative">
            <Image
              quality={50}
              src={url}
              alt={name}
              fill
              className="rounded-md object-cover object-center"
            />
          </div>
          <div className="flex flex-col justify-evenly h-full">
            <span className="font-semibold text-white/80 text-sm">{name}</span>
            <span className="text-xs text-white/60">
              {size > 1000 ? `${size / 1000}MB` : `${size}KB`}
            </span>
          </div>
          <div className="ml-auto">
            <WithExpandedImg src={url}>
              <Button size="sm">View File</Button>
            </WithExpandedImg>
          </div>
        </li>
      ))}
    </ol>
  );
};
