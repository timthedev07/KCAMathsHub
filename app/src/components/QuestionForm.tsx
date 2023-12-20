"use client";

import { TRPCClientError } from "@trpc/client";
import { ToggleSwitch } from "flowbite-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { FaEye, FaUserSecret } from "react-icons/fa";
import { FaClipboardUser } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { anyError } from "../lib/anyError";
import { uploadToAPI } from "../lib/attachmentClientUpload";
import { filteredError } from "../lib/filterError";
import { validateForm } from "../lib/handleZodErr";
import { pageURLs } from "../lib/pageURLGen";
import { AskSchema } from "../schema/ask";
import { AppRouter } from "../server";
import { trpc } from "../trpc/client";
import { ErrorStateType, ModifyValueType } from "../types/ErrorStateType";
import { CategoryAutoComplete } from "./CategoryAutoComplete";
import { LoadingOverlay } from "./LoadingOverlay";
import { MessageActionModal } from "./MessageActionModal";
import { QCategoryBadge } from "./QCategoryBadge";
import { AttachmentUpload } from "./attachment-upload";
import { FL } from "./attachment-upload/types";
import { Button } from "./reusable/Button";
import { Input } from "./reusable/Input";
import { LabelErrorWrapper } from "./reusable/WithLabelWrapper";
import { QAEditor } from "./richtext/ForwardRefEditor";
import { StyledWrapper } from "./richtext/StyledWrapper";

interface FormData {
  title: string;
  content: string;
  categories: string[];
  anonymous: boolean;
}

interface QuestionFormProps {
  userId: string;
  defaultValues?: FormData & { files: FL };
  operationType?: "ask" | "update";
  quid?: string;
}

const adviceListClassname =
  "text-white/70 list-disc space-y-8 text-sm pl-5 pt-5";

export const QuestionForm: FC<QuestionFormProps> = ({
  userId,
  defaultValues,
  quid,
  operationType = "ask",
}) => {
  const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorStateType<FormData>>({});
  const [formData, setFormData] = useState<FormData>(() => {
    if (defaultValues && operationType === "update") {
      const { files: _, ...rest } = defaultValues;
      return rest;
    } else {
      return {
        title: "",
        content: "",
        categories: [],
        anonymous: false,
      };
    }
  });
  const [changed, setChanged] = useState<ModifyValueType<FormData, boolean>>({
    anonymous: false,
    categories: false,
    content: false,
    title: false,
  });

  // bring in mutations
  const { getQuestion, getQuestions } = trpc.useUtils();
  const addAttachments = trpc.addAttachments.useMutation().mutateAsync;
  const ask = trpc.askQuestion.useMutation({
    onSuccess: async () => {
      await getQuestions.invalidate({}, { refetchType: "all" });
    },
  }).mutateAsync;
  const update = trpc.updateQuestion.useMutation({
    onSuccess: async () => {
      await getQuestion.invalidate({ quid });
      await getQuestions.invalidate({}, { refetchType: "all" });
      if (quid) push(pageURLs.question(quid));
    },
  }).mutateAsync;

  // keep track off files
  const [files, setFiles] = useState<FL>(() => {
    if (defaultValues) {
      return defaultValues.files;
    } else {
      return [];
    }
  });

  const handleAsk = async (e: FormEvent) => {
    e.preventDefault();

    if (anyError(errors, changed)) {
      return;
    }

    setLoading(true);

    // upload -> submission logic
    const atts = await uploadToAPI(files, addAttachments);

    try {
      if (operationType === "ask") {
        const quid = await ask({ ...formData, userId, attachmentIds: atts });
        push(pageURLs.question(quid));
      } else {
        if (!quid) return;
        try {
          await update({
            quid,
            updateData: { ...formData, attachmentIds: atts },
          });
        } catch (e) {
          console.log(e);
        }
      }
    } catch (err: unknown) {
      const msg = (err as TRPCClientError<AppRouter>).data?.zodError
        ?.fieldErrors;
      console.log("failure", err);

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

      setErrors(() => filteredError(errors, changed));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return (
    <>
      <LoadingOverlay isLoading={loading} />
      <MessageActionModal
        heading="Back"
        open={modalOpen}
        setOpen={setModalOpen}
        action={async () => {
          if (!quid) return;
          push(pageURLs.question(quid));
        }}
      >
        <div className="space-y-4">
          <p>
            Leaving now will <strong>discard</strong> all changes, are you sure
            to continue?
          </p>
        </div>
      </MessageActionModal>
      <div className="flex gap-6 px-2 md:px-8 lg:px-16 my-10">
        <div className="flex-1 rounded-xl border border-slate-300/20 p-6 lg:p-10 ">
          <form
            // bg-slate-900/60 hover:bg-slate-800/80
            className="w-full px-4 flex-col flex gap-12"
            onSubmit={handleAsk}
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
                value={formData.title}
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
                        categories: prev.categories.filter((name) => {
                          return name.toLowerCase() !== c.toLowerCase();
                        }),
                      }));
                    }}
                    ind={ind}
                    name={c}
                    key={c}
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
            <AttachmentUpload
              operationType={operationType}
              files={files}
              setFiles={setFiles}
            />
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
                  color="success"
                />
                <FaUserSecret className="w-5 h-5" />
                Anonymous
              </div>
              <div className="h-min flex gap-3">
                {operationType === "update" && quid ? (
                  <Button
                    onClick={() => {
                      setModalOpen(true);
                    }}
                    color="blue"
                  >
                    <FaEye className="mr-2" />
                    <span>View question</span>
                  </Button>
                ) : null}
                <Button
                  type="submit"
                  disabled={anyError(errors, changed)}
                  size="md"
                  color="success"
                >
                  <IoIosSend className="mr-2" />
                  {operationType === "ask" ? "Ask question" : "Save changes"}
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="hidden xl:flex flex-col flex-shrink-0 w-[380px] p-6 lg:p-10 border-slate-300/20 border bg-blue-500/[0.05] rounded-xl">
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
