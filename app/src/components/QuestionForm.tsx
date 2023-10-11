"use client";

import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Input } from "./reusable/Input";
import { TextArea } from "./reusable/TextArea";
import { useSession } from "next-auth/react";
import { trpc } from "../trpc/client";
import { Button } from "./reusable/Button";
import { AttachmentUpload } from "./AttachmentUpload";

interface QuestionFormProps {
  userId: string;
}

interface FormData {
  title: string;
  content: string;
}

export const QuestionForm: FC<QuestionFormProps> = ({ userId }) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
  });
  const ask = trpc.askQuestion.useMutation().mutateAsync;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask({ ...formData, userId, attachmentIds: [] });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const n = e.target.name;
    setFormData((prev) => {
      return { ...prev, [n]: e.target.value };
    });
    console.log(formData);
  };

  return (
    <form
      className="dev-border-orange w-full p-24 flex-col flex gap-12"
      onSubmit={handleSubmit}
    >
      <Input name="title" onChange={handleChange} label="Title" />
      <TextArea name="content" onChange={handleChange} label="Content" />
      <AttachmentUpload />
      <Button type="submit">Ask</Button>
    </form>
  );
};
