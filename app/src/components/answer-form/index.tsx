"use client";

import { ToggleSwitch } from "flowbite-react";
import { useRouter } from "next/navigation";
import { ComponentProps, FC, FormEvent, useState } from "react";
import { FaCheck, FaClipboardUser, FaUserSecret } from "react-icons/fa6";
import { useForm } from "../../hooks/useForm";
import { anyError } from "../../lib/anyError";
import { uploadToAPI } from "../../lib/attachmentClientUpload";
import { pageURLs } from "../../lib/pageURLGen";
import { AnswerSchema } from "../../schema/answer";
import { trpc } from "../../trpc/client";
import { LoadingOverlay } from "../LoadingOverlay";
import { TimedMessageToast } from "../TimedMessageToast";
import { AttachmentUpload } from "../attachment-upload";
import { FL } from "../attachment-upload/types";
import { Button } from "../reusable/Button";
import { LabelErrorWrapper } from "../reusable/WithLabelWrapper";
import { QAEditor } from "../richtext/ForwardRefEditor";
import { StyledWrapper } from "../richtext/StyledWrapper";

interface AnswerFormProps {
  operationType: "answer" | "update";
  quid: string;
  uid: string;
  scrollToTop?: Function;
  defaultValues?: {
    aid: string;
    formData: { content: string; anonymous: boolean };
    files: FL;
  };
}

export const AnswerForm: FC<AnswerFormProps> = ({
  operationType,
  quid,
  uid,
  scrollToTop,
  defaultValues,
}) => {
  const { push } = useRouter();
  const [level, setLevel] =
    useState<ComponentProps<typeof TimedMessageToast>["level"]>("error");
  const { refetch } = trpc.getQuestionAnswers.useQuery(
    { quid, pageNum: 1 },
    { enabled: false }
  );
  const addAttachments = trpc.addAttachments.useMutation().mutateAsync;
  const answerQuestion = trpc.answerQuestion.useMutation().mutateAsync;
  const editAnswer = trpc.editAnswer.useMutation({}).mutateAsync;

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  const [files, setFiles] = useState<FL>(() =>
    defaultValues ? defaultValues.files : []
  );

  const { formData, update, changed, errors } = useForm({
    defaultValues: defaultValues
      ? defaultValues.formData
      : {
          content: "",
          anonymous: false,
        },
    validationSchema: AnswerSchema,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (anyError(errors, changed)) {
      return;
    }

    setLoading(true);

    // upload -> submission logic
    const atts = await uploadToAPI(files, addAttachments);

    try {
      if (operationType === "answer") {
        const res = await answerQuestion({
          ...formData,
          attachmentIds: atts,
          questionId: quid,
          userId: uid,
        });

        if (!res.success) {
          setShowToast(true);
          setMessage(res.message);
          setLoading(false);
        } else {
          await refetch();
          setLevel("success");
          setLoading(false);
          setMessage("Answer posted!");
          setShowToast(true);
          if (scrollToTop) scrollToTop();
        }
      } else {
        if (!defaultValues?.aid) return;

        const response = await editAnswer({
          aid: defaultValues?.aid,
          ...formData,
          attachmentIds: atts,
          questionId: quid,
          userId: uid,
        });

        if (response.success) {
          setLevel("success");
          setLoading(false);
          setMessage("Answer updated!");
          setShowToast(true);
          push(pageURLs.question(quid));
        } else {
          setShowToast(true);
          setMessage(response.message);
          setLoading(false);
        }
      }
    } catch (err: unknown) {}
  };

  return (
    <>
      <TimedMessageToast
        show={showToast}
        setShow={setShowToast}
        timeMilliseconds={10000}
        level={level}
      >
        {message}
      </TimedMessageToast>
      <LoadingOverlay isLoading={loading} />
      <form
        className="border-slate-300/30 rounded-lg gap-4 flex flex-col w-full mb-10"
        onSubmit={handleSubmit}
      >
        <LabelErrorWrapper
          className="w-full"
          label="Answer"
          error={errors.content}
        >
          <StyledWrapper className="w-full">
            <QAEditor
              markdown={formData.content}
              onChange={(val) => {
                update("content", val);
              }}
            />
          </StyledWrapper>
        </LabelErrorWrapper>
        <AttachmentUpload
          operationType={"answer"}
          files={files}
          setFiles={setFiles}
        />
        <div className="flex justify-between items-center">
          <div className="h-fit flex px-5 py-3 rounded-xl items-center gap-4 border-slate-300/30 border bg-slate-400/[0.05]">
            <FaClipboardUser className="w-5 h-5" />
            <ToggleSwitch
              checked={formData.anonymous}
              onChange={(val) => {
                update("anonymous", val);
              }}
              color="success"
            />
            <FaUserSecret className="w-5 h-5" />
            Anonymous
          </div>

          <Button
            className="h-fit"
            color="success"
            type="submit"
            disabled={
              anyError(errors, changed) ||
              (!changed.content && !changed.anonymous) ||
              (operationType === "update" &&
                defaultValues?.formData.content === formData.content &&
                defaultValues?.formData.anonymous === formData.anonymous)
            }
          >
            <FaCheck className="mr-2" />
            {operationType.charAt(0).toUpperCase() +
              operationType.slice(1)}{" "}
            answer
          </Button>
        </div>
      </form>
    </>
  );
};
