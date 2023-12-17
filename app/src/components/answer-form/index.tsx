"use client";

import { FC, FormEvent, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { anyError } from "../../lib/anyError";
import { uploadToAPI } from "../../lib/attachmentClientUpload";
import { AnswerSchema } from "../../schema/answer";
import { trpc } from "../../trpc/client";
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

  const [files, setFiles] = useState<FL>(() => {
    return [];
  });

  const { formData, update, changed, errors } = useForm({
    defaultValues: {
      content: "",
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
      } else {
        // updating logic
      }
    } catch (err: unknown) {}
  };

  return (
    <form className="border-slate-300/30 rounded-lg flex flex-col w-full mb-10">
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
            autoFocus
          />
        </StyledWrapper>
      </LabelErrorWrapper>
      <AttachmentUpload
        operationType={"answer"}
        files={files}
        setFiles={setFiles}
      />
      <Button className="ml-auto my-10">HEY</Button>
    </form>
  );
};
