"use client";

import Image from "next/image";
import { FC, SetStateAction, useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { IoMdCloudUpload } from "react-icons/io";

export type FL = FileWithIdAndObjURL[];

interface AttachmentUploadProps {
  files: FL;
  setFiles: React.Dispatch<SetStateAction<FL>>;
}

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_COUNT = 10;

export interface FileWithIdAndObjURL {
  file: File;
  id: string;
  url: string;
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

          return isDup || file.size * 1000 * 1000 > MAX_FILE_SIZE_MB
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

  const deleteAttachment = (file: FileWithIdAndObjURL) => {
    setFiles((prev) => {
      const removeInd = prev.findIndex((v) => v.id == file.id);
      return prev.toSpliced(removeInd, 1);
    });
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      <label className="font-bold">Add Attachments</label>
      <div className="w-full flex flex-col md:flex-row p-4">
        <div className="flex flex-col gap-10 w-full md:w-1/2 aspect-video md:aspect-[4/3] space-x-8">
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
            </div>
          </div>
        </div>
        <ul className="w-full md:w-1/2 md:h-full md:overflow-y-scroll">
          {files.map((each) => (
            <li key={each.id + each.url} className="flex items-center">
              <div className="w-6 h-6">
                <Image
                  alt=""
                  src={each.url}
                  sizes="100%"
                  className="object-cover"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
