"use client";

import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
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
import { LabelErrorWrapper } from "./reusable/WithLabelWrapper";
import { FaUserSecret } from "react-icons/fa";
import { FaClipboardUser } from "react-icons/fa6";
import { LoadingOverlay } from "./LoadingOverlay";
import { FL } from "./attachment-upload/types";
import { QCategoryBadge } from "./QCategoryBadge";
import { ErrorStateType, ModifyValueType } from "../types/ErrorStateType";
import { AskSchema } from "../schema/ask";
import { validateForm } from "../lib/handleZodErr";
import { filteredError } from "../lib/filterError";
import { anyError } from "../lib/anyError";

interface QuestionFormProps {
  userId: string;
}

interface FormData {
  title: string;
  content: string;
  categories: { id: number; name: string }[];
  anonymous: boolean;
}

const adviceListClassname =
  "text-white/70 list-[georgian] space-y-4 text-sm pl-5 pt-5";

export const QuestionForm: FC<QuestionFormProps> = ({ userId }) => {
  const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorStateType<FormData>>({});
  const [formData, setFormData] = useState<FormData>(() => ({
    title: "",
    content: "",
    categories: [],
    anonymous: false,
  }));
  const [changed, setChanged] = useState<ModifyValueType<FormData, boolean>>({
    anonymous: false,
    categories: false,
    content: false,
    title: false,
  });

  // bring in mutations
  const addAttachments = trpc.addAttachments.useMutation().mutateAsync;
  const ask = trpc.askQuestion.useMutation().mutateAsync;

  // keep track off files
  const [files, setFiles] = useState<FL>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (anyError(errors, changed)) {
      return;
    }

    setLoading(true);

    // upload -> submission logic
    const atts = await uploadToAPI(files, addAttachments);

    try {
      const quid = await ask({ ...formData, userId, attachmentIds: atts });
      setLoading(false);
      push(pageURLs.question(quid));
    } catch (err: unknown) {
      setLoading(false);
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

  useEffect(() => {
    (async () => {
      const { success, errors } = await validateForm(formData, AskSchema);

      if (success || !errors) return setErrors({});

      setErrors(filteredError(errors, changed));
    })();
  }, [formData, changed]);

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
                error={errors.title}
                placeholder="Enter a title"
                name="title"
                className="text-sm  "
                onChange={(e) => {
                  handleChange(e);
                  setChanged((prev) => ({ ...prev, title: true }));
                }}
                label="Title"
              />

              <LabelErrorWrapper error={errors.categories} label="Topic(s)">
                <span className="text-white/70 text-xs">Max. 5</span>
                <CategoryAutoComplete
                  selectedCategories={formData.categories}
                  addCategory={(c) => {
                    setFormData((prev) => ({
                      ...prev,
                      categories: [...prev.categories, c],
                    }));
                    setChanged((prev) => ({ ...prev, categories: true }));
                  }}
                />
              </LabelErrorWrapper>

              <ul className="flex flex-wrap gap-2">
                {formData.categories.map((c, ind) => (
                  <QCategoryBadge
                    onDelete={() => {
                      setFormData((prev) => ({
                        ...prev,
                        categories: prev.categories.filter(({ name }) => {
                          return name.toLowerCase() !== c.name.toLowerCase();
                        }),
                      }));
                    }}
                    ind={ind}
                    name={c.name}
                    key={c.id}
                  />
                ))}
              </ul>

              <LabelErrorWrapper error={errors.content} label="Content">
                <StyledWrapper>
                  <QAEditor
                    markdown={formData.content}
                    onChange={(val) => {
                      setFormData((prev) => ({ ...prev, content: val }));
                      setChanged((prev) => ({ ...prev, content: true }));
                    }}
                  />
                </StyledWrapper>
              </LabelErrorWrapper>
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
                    setChanged((prev) => ({ ...prev, anonymous: true }));
                  }}
                />
                <Tooltip animation="duration-400" content="Remain anonymous">
                  <FaUserSecret className="w-5 h-5" />
                </Tooltip>
              </div>
              <div className="h-min">
                <Button
                  type="submit"
                  disabled={anyError(errors, changed)}
                  size="md"
                >
                  Ask Question
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="hidden xl:flex flex-col flex-shrink-0 w-[380px] p-6 lg:p-10 border-slate-300/30 border bg-slate-400/[0.05] rounded-xl">
          <p className="font-bold text-lg">Guidelines</p>
          <ol className={adviceListClassname}>
            <li>
              Any offensive/inappropriate content entered or linked externally
              will result in an immediate ban.
            </li>
            <li>
              Make your best attempt and be sure to include it before asking for
              help, so responses are more likely to be made more quickly.
            </li>
            <li>
              Remember to mark as solved once you have figured out the solution.
              Answer your own question to help others too if you feel like it
              for a chance of a reputation boost after moderation.
            </li>
          </ol>
          <p className="font-bold text-lg mt-10">Requirements & Assumptions</p>
          <ol className={adviceListClassname}>
            <li>Respectful and decent use of language.</li>
            <li>
              You have <strong>carefully read the question</strong>.
            </li>
            <li>You have already attempted the question.</li>
            <li>
              The layout of any working/information (both descriptions entered
              and hand-written uploaded as attachments, if any) should be
              clearly visible with acceptable handwriting.
            </li>
          </ol>
          <p className="font-bold text-lg mt-10">Tips</p>
          <ol className={adviceListClassname}>
            <li>
              If stuck on a question, try taking a break before coming back and
              making further progress.
            </li>
            <li>Be correct, detailed, and precise to be answered sooner.</li>
            <li>
              Decompose and visualize the problem; then describe how far you
              got, along with reasoning.
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};
