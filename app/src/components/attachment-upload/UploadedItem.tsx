"use client";
import { FC, useEffect, useState } from "react";
import { Spinner, Progress } from "flowbite-react";
import { ImageSVG } from "../../svgs/Image";
import { FileWithIdAndObjURL } from "./types";

interface UploadedItemProps {
  file: FileWithIdAndObjURL;
}

const BytesPS = 500000; // 1MB
const updateIntervalMS = 10;

const getLoadingTimeSeconds = (fileSizeBytes: number) => {
  return Math.min(fileSizeBytes / BytesPS, 1.5) * Math.max(Math.random());
}; // 10kb

export const UploadedItem: FC<UploadedItemProps> = ({ file }) => {
  const [loading, setLoading] = useState<boolean>(() => true);
  const [progress, setProgress] = useState<number>(0);
  const size = file.file.size;
  const totalTime = getLoadingTimeSeconds(size) * 1000;

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
    <li className="flex items-center px-8 py-2 gap-4">
      <div className="w-12 h-12 relative flex justify-center items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <ImageSVG className={`w-full ${loading ? "brightness-[0.2]" : ""}`} />
        <div className="absolute w-full h-full flex justify-center items-center">
          {loading ? <Spinner size="md" color="info" /> : null}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-2">
        <span className="truncate text-white/70 text-sm">{file.file.name}</span>
        <Progress progress={progress} size="sm" color="cyan" />
      </div>
    </li>
  );
};
