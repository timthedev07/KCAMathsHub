"use client";
import { FC, useEffect, useMemo, useState } from "react";
import { Spinner, Progress } from "flowbite-react";
import { ImageSVG } from "../../svgs/Image";
import { FileWithIdAndObjURL } from "./types";
import { FaRegCheckCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { WithExpandedImg } from "../attachments/ExpandedImg";
import { trpc } from "../../trpc/client";

interface UploadedItemProps {
  file: FileWithIdAndObjURL;
  deleteAttachment: (_: string) => void;
  operationType: "ask" | "update";
}

const BytesPS = 400000; // 1MB
const updateIntervalMS = 10;

const getLoadingTimeSeconds = (fileSizeBytes: number) => {
  return Math.min(fileSizeBytes / BytesPS, 1.5) * Math.max(Math.random());
}; // 10kb

export const UploadedItem: FC<UploadedItemProps> = ({
  file,
  deleteAttachment,
  operationType,
}) => {
  const [loading, setLoading] = useState<boolean>(() => true);
  const [progress, setProgress] = useState<number>(0);
  const size = file.file ? file.file.size : file.size ? file.size : 0;
  const deleteRemoteAttachment =
    trpc.deleteAttachment.useMutation().mutateAsync;
  const isRemote = !file.file;
  const totalTime = useMemo(() => getLoadingTimeSeconds(size) * 1000, [size]);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
    }, totalTime);

    return () => {
      clearTimeout(t);
    };
  }, [size, totalTime]);

  useEffect(() => {
    const interval = setInterval(
      () => setProgress((prev) => prev + (updateIntervalMS / totalTime) * 100),
      updateIntervalMS
    );
    return () => {
      clearInterval(interval);
    };
  }, [totalTime]);

  return (
    <li className="flex items-center pl-8 py-2 gap-4">
      <WithExpandedImg isBlob src={file.url}>
        <div className="cursor-pointer w-12 h-12 relative flex justify-center items-center">
          <ImageSVG
            className={`w-12 h-12 ${loading ? "brightness-[0.2]" : ""}`}
          />

          <div className="absolute w-full h-full flex justify-center items-center">
            {loading ? <Spinner size="md" color="info" /> : null}
          </div>
        </div>
      </WithExpandedImg>
      <div className="w-full flex flex-col justify-center gap-2">
        <div className="w-full flex justify-between gap-4">
          <span className="truncate max-w-[60%] text-white/60 text-xs">
            {file.file ? file.file.name : file.name ? file.name : "Attachment"}
          </span>
          {!loading && progress > 98 ? (
            <FaRegCheckCircle className="w-4 h-4 text-green-400" />
          ) : null}
        </div>
        <Progress progress={progress} size="sm" color="cyan" />
      </div>
      <div
        onClick={async () => {
          setLoading(true);
          if (isRemote && file.objKey && operationType === "update")
            await deleteRemoteAttachment(file.objKey);
          deleteAttachment(file.id);
          setLoading(false);
        }}
        className="p-1 bg-yellow-200/10 rounded-md flex justify-center items-center cursor-pointer group transitiond duration-200 hover:bg-yellow-200/20"
      >
        <RxCross2 className="w-4 h-4 text-yellow-300/70 group-hover:text-yellow-300/80" />
      </div>
    </li>
  );
};
