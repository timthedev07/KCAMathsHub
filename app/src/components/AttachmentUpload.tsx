"use client";

import { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadAttachmentDisplay } from "./UploadAttachmentDisplay";
import { ImgUrlsType } from "../types/upload";
import { trpc } from "../trpc/client";

interface AttachmentUploadProps {
  setAttachmentIds?: (ids: number[]) => void;
}

export interface FileWithIdAndObjURL {
  file: File;
  id: string;
  url: string;
}

export const AttachmentUpload: FC<AttachmentUploadProps> = ({
  setAttachmentIds = () => {},
}) => {
  const [files, setFiles] = useState<FileWithIdAndObjURL[]>([]);
  const addAttachments = trpc.addAttachments.useMutation().mutateAsync;

  const onDrop = useCallback((fl: File[]) => {
    for (const file of fl) {
      if (file.type.startsWith("image")) {
        const uniqueId = `${Date.now()}_${file.name}_${Math.random() * 10}`;
        setFiles((prev) => [
          { file, id: uniqueId, url: URL.createObjectURL(file) },
          ...prev,
        ]);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const deleteAttachment = (file: FileWithIdAndObjURL) => {
    setFiles((prev) => {
      const removeInd = prev.findIndex((v) => v.id == file.id);
      return prev.toSpliced(removeInd, 1);
    });
  };

  const handleSubmit = async () => {
    if (files.length < 1) return;

    const formData = new FormData();
    let i = 0;
    for (const file of files) {
      formData.append(`file_${i}`, file.file);
      i++;
    }
    formData.append("file_count", `${i}`);

    const res = await fetch("/api/upload", {
      body: formData,
      method: "POST",
    });

    const data = ((await res.json()) as { imgUrls: ImgUrlsType }).imgUrls;
    const atts = await addAttachments(
      data.map(({ name, url }) => ({ url: url, attachmentName: name }))
    );
    setAttachmentIds(atts);
  };

  return (
    <div className="rounded-xl border border-green-500 p-10 flex flex-col gap-10">
      <div className="overflow-hidden h-64 border-orange-500 border rounded-xl">
        <div className="h-full flex gap-4 px-4 items-center scroll-x overflow-scroll scrollbar-no-space scrollbar-thin">
          {files.map((file) => (
            <UploadAttachmentDisplay
              deleteFile={deleteAttachment}
              file={file}
              key={file.file.name + file.file.lastModified}
            />
          ))}
        </div>
      </div>
      <div
        {...getRootProps()}
        className="flex p-8 min-h-[300px] text-center items-center justify-center w-full border-orange-800 border rounded-xl h-full"
      >
        <input {...getInputProps()} type="file" accept="image/*" />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and drop some files here, or click to select files</p>
        )}
      </div>
      <div className="flex w-full justify-end">
        <button
          className="bg-orange-600 text-white font-bold px-4 py-2 rounded-md"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
