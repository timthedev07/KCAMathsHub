"use client";

import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Input } from "./reusable/Input";
import { TextArea } from "./reusable/TextArea";
import { trpc } from "../trpc/client";
import { AttachmentUpload, FL } from "./AttachmentUpload";
import { uploadToAPI } from "../lib/attachmentClientUpload";
import { useRouter } from "next/navigation";
import { pageURLs } from "../lib/pageURLGen";
import { TRPCError } from "@trpc/server";
import { Button } from "./reusable/Button";

interface QuestionFormProps {
  userId: string;
}

interface FormData {
  title: string;
  content: string;
}

export const QuestionForm: FC<QuestionFormProps> = ({ userId }) => {
  const { push } = useRouter();
  const [formData, setFormData] = useState<FormData>(() => ({
    title: "",
    content: "",
  }));
  // bring in mutations
  const addAttachments = trpc.addAttachments.useMutation().mutateAsync;
  const ask = trpc.askQuestion.useMutation().mutateAsync;

  // keep track off files
  const [files, setFiles] = useState<FL>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // upload -> submission logic
    const atts = await uploadToAPI(files, addAttachments);

    try {
      const quid = await ask({ ...formData, userId, attachmentIds: atts });
      push(pageURLs.question(quid));
    } catch (err: unknown) {
      const msg = (err as TRPCError).message;
      push(pageURLs.error(msg));
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => {
      const n = e.target.name;
      return { ...prev, [n]: e.target.value };
    });
  };

  return (
    <form
      className="dev-border-orange w-full p-8 md:p-24 flex-col flex gap-12"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-8">
        <Input name="title" onChange={handleChange} label="Title" />
        <TextArea name="content" onChange={handleChange} label="Content" />
      </div>
      <AttachmentUpload files={files} setFiles={setFiles} />
      <Button type="submit">Ask</Button>
    </form>
  );
};
