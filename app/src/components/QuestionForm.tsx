"use client";

import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Input } from "./reusable/Input";
import { trpc } from "../trpc/client";
import { AttachmentUpload, FL } from "./AttachmentUpload";
import { uploadToAPI } from "../lib/attachmentClientUpload";
import { useRouter } from "next/navigation";
import { pageURLs } from "../lib/pageURLGen";
import { Button } from "./reusable/Button";
import { QAEditor } from "./richtext/ForwardRefEditor";
import { CategoryAutoComplete } from "./CategoryAutoComplete";
import { TRPCClientError } from "@trpc/client";
import { AppRouter } from "../server";
import { StyledWrapper } from "./richtext/StyledWrapper";
import { ToggleSwitch } from "flowbite-react";

interface QuestionFormProps {
  userId: string;
}

interface FormData {
  title: string;
  content: string;
  categories: { id: number; name: string }[];
  anonymous: boolean;
}

export const QuestionForm: FC<QuestionFormProps> = ({ userId }) => {
  const { push } = useRouter();
  const [formData, setFormData] = useState<FormData>(() => ({
    title: "",
    content: "",
    categories: [],
    anonymous: false,
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
      const msg = (err as TRPCClientError<AppRouter>).data?.zodError
        ?.fieldErrors;

      if (!msg) return;

      push(
        pageURLs.error(
          msg[Object.keys(msg || {})[0]]
            ? msg![Object.keys(msg || {})[0]]![0]
            : ""
        )
      );
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
      className="dev-border-orange w-full p-8 lg:p-24 flex-col flex gap-12"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-8">
        <Input name="title" onChange={handleChange} label="Title" />
        <StyledWrapper>
          <QAEditor
            markdown={formData.content}
            onChange={(val) => {
              setFormData((prev) => ({ ...prev, content: val }));
            }}
          />
        </StyledWrapper>
        <CategoryAutoComplete
          selectedCategories={formData.categories}
          addCategory={(c) => {
            setFormData((prev) => ({
              ...prev,
              categories: [...prev.categories, c],
            }));
          }}
        />
        Anonymous?
        <ToggleSwitch
          checked={formData.anonymous}
          onChange={(val) => {
            setFormData((prev) => ({ ...prev, anonymous: val }));
          }}
        />
      </div>
      <AttachmentUpload files={files} setFiles={setFiles} />
      <Button type="submit">Ask</Button>
    </form>
  );
};
