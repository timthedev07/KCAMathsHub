"use client";

import { FC } from "react";
import Image from "next/image";
import { FileWithIdAndObjURL } from "./AttachmentUpload";

interface UploadAttachmentDisplayProps {
  file: FileWithIdAndObjURL;
  // eslint-disable-next-line no-unused-vars
  deleteFile: (file: FileWithIdAndObjURL) => void;
}

export const UploadAttachmentDisplay: FC<UploadAttachmentDisplayProps> = ({
  file,
  deleteFile,
}) => {
  return (
    <div>
      <button
        className="bg-slate-200 text-black rounded-md"
        onClick={() => {
          deleteFile(file);
        }}
      >
        Remove
      </button>
      <div className="relative aspect-square h-[80%]">
        <Image src={file.url} fill className="object-contain" alt="" />
      </div>
    </div>
  );
};
