"use client";

import { ToggleSwitch } from "flowbite-react";
import { FC, FormEvent, useState } from "react";
import { FaCheck, FaClipboardUser, FaUserSecret } from "react-icons/fa6";
import { useForm } from "../../hooks/useForm";
import { anyError } from "../../lib/anyError";
import { uploadToAPI } from "../../lib/attachmentClientUpload";
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
}

export const AnswerForm: FC<AnswerFormProps> = ({
  operationType,
  quid,
  uid,
}) => {
  const addAttachments = trpc.addAttachments.useMutation().mutateAsync;
  const answerQuestion = trpc.answerQuestion.useMutation({
    onMutate: async (data) => {},
  }).mutateAsync;

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  const [files, setFiles] = useState<FL>(() => {
    return [];
  });

  const { formData, update, changed, errors } = useForm({
    defaultValues: {
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

        setLoading(false);

        if (!res.success) {
          setShowToast(true);
          setMessage(res.message);
        }
      } else {
        // updating logic
      }
    } catch (err: unknown) {}
  };

  return (
    <>
      <TimedMessageToast
        show={showToast}
        setShow={setShowToast}
        timeMilliseconds={10000}
        level="error"
      >
        {message}
      </TimedMessageToast>
      <LoadingOverlay isLoading={loading} />
      <form
        className="border-slate-300/30 rounded-lg flex flex-col w-full mb-10"
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
            disabled={anyError(errors, changed) || !changed.content}
          >
            <FaCheck className="mr-2" />
            Submit Answer
          </Button>
        </div>
      </form>
    </>
  );
};
