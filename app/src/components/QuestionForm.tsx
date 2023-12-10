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
    <div className="flex gap-6 px-8 my-10">
      <div className="flex-1">
        <form
        // bg-slate-900/60 hover:bg-slate-800/80
          className="w-full p-8 flex-col flex gap-12 rounded-xl"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-8">
            <Input name="title" onChange={handleChange} label="Title" />
            <div className="-mb-6 text-xl font-bold">Topic</div>
            {/* Could be added as a label */}
            <CategoryAutoComplete
              selectedCategories={formData.categories}
              addCategory={(c) => {
                setFormData((prev) => ({
                  ...prev,
                  categories: [...prev.categories, c],
                }));
              }}
            />
            <div className="-mb-6 text-xl font-bold">Content</div>
            {/* Could be added as a label */}
            <StyledWrapper>
              <QAEditor
                markdown={formData.content}
                onChange={(val) => {
                  setFormData((prev) => ({ ...prev, content: val }));
                }}
              />
            </StyledWrapper>
          </div>
          <AttachmentUpload files={files} setFiles={setFiles} />
          <div className="flex justify-between">
            <div className="flex pt-4">
              <div className="mr-2">Fa</div>  
              {/* Add an icon that you wanted  */}
              <ToggleSwitch
                  checked={formData.anonymous}
                  onChange={(val) => {
                    setFormData((prev) => ({ ...prev, anonymous: val }));
                  }}
                />
            </div>
            <Button type="submit" size="md">Ask</Button>
          </div>  
        </form>
      </div>  
      <div className="hidden xl:flex flex-col flex-shrink-0 w-[380px] p-6 border-slate-300/30 border bg-slate-400/[0.05] rounded-xl">
        <p className="font-bold text-2xl">Advices</p>
        <div className="">
          <ol className="list-decimal pl-10 pt-5">
            <li>Don't be lazy</li>
            <li>Don't be lazy</li>
            <li>Don't be lazy</li>
            <li>Don't be lazy</li>
          </ol>
        </div>  
        <p className="font-bold text-2xl mt-10">Recomendations</p>
        <div className="">
          <ol className="list-decimal pl-10 pt-5">
            <li>Don't be lazy</li>
            <li>Don't be lazy</li>
            <li>Don't be lazy</li>
            <li>Don't be lazy</li>
          </ol>
        </div>  
        <p className="font-bold text-2xl mt-10">Tricks</p>
        <div className="">
          <ol className="list-decimal pl-10 pt-5">
            <li>Don't be lazy</li>
            <li>Don't be lazy</li>
            <li>Don't be lazy</li>
            <li>Don't be lazy</li>
          </ol>
        </div>  
      </div>
    </div>  
  );
};
