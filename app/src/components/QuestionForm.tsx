"use client";

import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Input } from "./reusable/Input";
import { trpc } from "../trpc/client";
import { AttachmentUpload } from "./attachment-upload";
import { uploadToAPI } from "../lib/attachmentClientUpload";
import { useRouter } from "next/navigation";
import { pageURLs } from "../lib/pageURLGen";
import { Button } from "./reusable/Button";
import { QAEditor } from "./richtext/ForwardRefEditor";
import { CategoryAutoComplete } from "./CategoryAutoComplete";
import { TRPCClientError } from "@trpc/client";
import { AppRouter } from "../server";
import { StyledWrapper } from "./richtext/StyledWrapper";
import { ToggleSwitch, Tooltip } from "flowbite-react";
import { LabelWrapper } from "./reusable/WithLabelWrapper";
import { FaUserSecret } from "react-icons/fa";
import { FaClipboardUser } from "react-icons/fa6";
import { LoadingOverlay } from "./LoadingOverlay";
import { FL } from "./attachment-upload/types";

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
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);

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
    setLoading(false);
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
    <>
      <LoadingOverlay isLoading={loading} />
      <div className="flex gap-6 px-2 md:px-8 lg:px-16 my-10">
        <div className="flex-1">
          <form
            // bg-slate-900/60 hover:bg-slate-800/80
            className="w-full p-8 flex-col flex gap-12"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-8">
              <Input
                name="title"
                className="text-sm  "
                onChange={handleChange}
                label="Title"
              />

              <LabelWrapper label="Topic(s)">
                <CategoryAutoComplete
                  selectedCategories={formData.categories}
                  addCategory={(c) => {
                    setFormData((prev) => ({
                      ...prev,
                      categories: [...prev.categories, c],
                    }));
                  }}
                />
              </LabelWrapper>
              <LabelWrapper label="Content">
                <StyledWrapper>
                  <QAEditor
                    markdown={formData.content}
                    onChange={(val) => {
                      setFormData((prev) => ({ ...prev, content: val }));
                    }}
                  />
                </StyledWrapper>
              </LabelWrapper>
            </div>
            <AttachmentUpload files={files} setFiles={setFiles} />
            {<hr className="h-[1px] w-full border-0 bg-slate-400/20 my-8" />}
            <div className="flex justify-between">
              <div className="flex px-5 py-3 rounded-xl items-center gap-4 border-slate-300/30 border bg-slate-400/[0.05]">
                <FaClipboardUser className="w-5 h-5" />
                <ToggleSwitch
                  checked={formData.anonymous}
                  onChange={(val) => {
                    setFormData((prev) => ({ ...prev, anonymous: val }));
                  }}
                />
                <Tooltip animation="duration-400" content="Remain anonymous">
                  <FaUserSecret className="w-5 h-5" />
                </Tooltip>
              </div>
              <div className="h-min">
                <Button type="submit" size="md">
                  Ask Question
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="hidden xl:flex flex-col flex-shrink-0 w-[380px] p-6 border-slate-300/30 border bg-slate-400/[0.05] rounded-xl">
          <p className="font-bold text-lg">Advice</p>
          <div className="">
            <ol className="list-decimal text-sm pl-10 pt-5">
              <li>Don&apos;t be lazy</li>
              <li>Don&apos;t be lazy</li>
              <li>Don&apos;t be lazy</li>
              <li>Don&apos;t be lazy</li>
            </ol>
          </div>
          <p className="font-bold text-lg mt-10">Recomendations</p>
          <div className="">
            <ol className="list-decimal text-sm pl-10 pt-5">
              <li>Don&apos;t be lazy</li>
              <li>Don&apos;t be lazy</li>
              <li>Don&apos;t be lazy</li>
              <li>Don&apos;t be lazy</li>
            </ol>
          </div>
          <p className="font-bold text-lg mt-10">Tricks</p>
          <div className="">
            <ol className="list-decimal text-sm pl-10 pt-5">
              <li>Don&apos;t be lazy</li>
              <li>Don&apos;t be lazy</li>
              <li>Don&apos;t be lazy</li>
              <li>Don&apos;t be lazy</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};
