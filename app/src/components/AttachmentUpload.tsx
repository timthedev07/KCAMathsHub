"use client";

import { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadAttachmentDisplay } from "./UploadAttachmentDisplay";

interface AttachmentUploadProps {}

export interface FileWithIdAndObjURL {
  file: File;
  id: string;
  url: string;
}

export const AttachmentUpload: FC<AttachmentUploadProps> = ({}) => {
  const [files, setFiles] = useState<FileWithIdAndObjURL[]>([]);

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

  const handleSubmit = () => {};

  return (
    <div className="w-[700px] h-[456px] rounded-xl border border-green-500 my-20 p-10 flex flex-col gap-10">
      <div className="overflow-hidden h-48 border-orange-500 border rounded-xl">
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
        className=" w-full border-orange-800 border rounded-xl h-full"
      >
        <input {...getInputProps()} type="file" accept="image/*" />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
};
