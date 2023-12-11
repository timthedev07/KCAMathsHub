"use client";

import { FC, SetStateAction, useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { IoMdCloudUpload } from "react-icons/io";
import { UploadedItem } from "./UploadedItem";
import { FL } from "./types";
import { MAX_FILE_COUNT, MAX_FILE_SIZE_MB } from "./constants";

interface AttachmentUploadProps {
  files: FL;
  setFiles: React.Dispatch<SetStateAction<FL>>;
}

export const AttachmentUpload: FC<AttachmentUploadProps> = ({
  files,
  setFiles,
}) => {
  const [error, setError] = useState<string | null>(null);
  const onDrop = useCallback((fl: File[], rejected: FileRejection[]) => {
    for (const file of fl) {
      if (file.type.startsWith("image")) {
        const uniqueId = `${Date.now()}_${file.name}_${Math.random() * 10}`;

        setFiles((prev) => {
          let isDup = false;

          for (const f of prev) {
            if (
              f.file.size === file.size &&
              f.file.name === file.name &&
              f.file.lastModified === file.lastModified
            ) {
              isDup = true;
              break;
            }
          }

          return isDup || file.size > MAX_FILE_SIZE_MB * 1000 * 1000
            ? prev
            : [
                {
                  file,
                  id: uniqueId,
                  url: URL.createObjectURL(file),
                },
                ...prev,
              ];
        });
      }
    }

    for (const rejection of rejected) {
      rejection.errors.forEach((err) => {
        if (err.code === "file-too-large") {
          setError(`Error: ${err.message}`);
        }

        if (err.code === "file-invalid-type") {
          setError(`Error: ${err.message}`);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/heic": [".heif", ".heic"],
    },
    maxFiles: MAX_FILE_COUNT,
    multiple: true,
    maxSize: MAX_FILE_SIZE_MB * 1000 * 1000,
  });

  const deleteAttachment = (fileId: string) => {
    setFiles((prev) => {
      const removeInd = prev.findIndex((v) => v.id == fileId);
      return prev.toSpliced(removeInd, 1);
    });
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      <label className="font-bold">Add Attachments</label>
      <p className="text-xs text-white/60">
        <strong>Pro tip</strong>: Click an uploaded image to preview
      </p>
      <div className="w-full flex flex-col lg:h-80 lg:flex-row p-4 gap-8 lg:gap-0">
        <div className="flex flex-col gap-10 w-full lg:w-5/12 aspect-video lg:aspect-[4/3] space-x-8">
          <div
            {...getRootProps()}
            className="flex p-16 bg-cyan-400/[0.02] cursor-pointer group border-4 border-dashed border-slate-100/40 text-center items-center justify-center w-full rounded-3xl h-full"
          >
            <input {...getInputProps()} type="file" />
            <div className="flex flex-col gap-2 items-center">
              <IoMdCloudUpload
                className={`transition duration-200 ${
                  files.length > 0 || isDragActive
                    ? "text-amber-500"
                    : "text-slate-500"
                } w-12 h-12`}
              />
              <span className="text-sm text-white/70 group-hover:text-white/90 transition duration-200">
                Drag or click to upload
              </span>
              <span>{error}</span>
            </div>
          </div>
        </div>
        <ul className="w-full lg:w-7/12 lg:h-full flex flex-col gap-4 lg:overflow-y-scroll">
          {files.map((each) => (
            <UploadedItem
              deleteAttachment={deleteAttachment}
              file={each}
              key={each.url + each.file.name}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
