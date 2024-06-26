"use client";

import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MessageActionModal } from "../../../components/helpers/message-action-modal";
import { TimedMessageToast } from "../../../components/helpers/time-message-toast";
import { Button } from "../../../components/reusable/Button";
import { Input } from "../../../components/reusable/Input";
import { trpc } from "../../../trpc/client";

interface DeletionButtonWithConfirmationProps {
  isOwner: boolean;
  uid: string;
  quid: string;
  aid?: string;
  entity?: "question" | "answer";
  currPage?: number;
  onSuccess?: Function;
  color?: string;
}

export const DeletionButtonWithConfirmation: FC<
  DeletionButtonWithConfirmationProps
> = ({
  isOwner,
  uid,
  quid: quid,
  currPage,
  aid,
  entity = "question",
  color = "blue",
  onSuccess,
}) => {
  const { push } = useRouter();
  const [msg, setMsg] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [x, setX] = useState<string>("");
  const { getQuestion, getQuestionAnswers, getQuestions } = trpc.useUtils();

  const mutateQ = trpc.deleteQuestion.useMutation({
    onSuccess: async () => {
      await getQuestion.invalidate({ quid });
      await getQuestions.invalidate({}, { refetchType: "all" });
    },
  }).mutateAsync;

  const mutateA = trpc.deleteAnswer.useMutation({
    onMutate: async () => {
      const search = { quid, pageNum: currPage! };
      await getQuestionAnswers.cancel();
      const prev = getQuestionAnswers.getData(search);
      getQuestionAnswers.setData(search, (a) => {
        if (!a) return a;
        return {
          ...a,
          answers: a.answers.filter((each) => each.id !== aid),
        };
      });

      return { prev };
    },
    onError: async (_, __, c) => {
      getQuestionAnswers.setData({ quid, pageNum: currPage! }, c?.prev);
    },
    onSettled: async () => {
      await getQuestionAnswers.invalidate({ quid, pageNum: currPage });
    },
  }).mutateAsync;

  return (
    <>
      <TimedMessageToast
        show={show}
        setShow={setShow}
        timeMilliseconds={3000}
        level="error"
      >
        {msg}
      </TimedMessageToast>
      <MessageActionModal
        proceedDisabled={x !== "permanently delete"}
        open={modalOpen}
        setOpen={setModalOpen}
        heading={`Delete ${entity}`}
        action={async () => {
          if (isOwner && uid) {
            switch (entity) {
              case "question": {
                const success = await mutateQ({
                  quid,
                  uid,
                });

                setModalOpen(false);

                if (success) {
                  if (onSuccess) onSuccess();
                  push("/");
                } else {
                  setMsg(
                    "Question couldn't be deleted; others invested time in it."
                  );
                  setShow(true);
                }

                break;
              }
              case "answer": {
                if (!aid) return;

                const response = await mutateA({
                  aid,
                });

                setModalOpen(false);

                if (response.success) {
                  if (onSuccess) onSuccess();
                } else {
                  setMsg(response.message);
                  setShow(true);
                }
                break;
              }
            }
          }
        }}
      >
        <div className="space-y-6 text-sm">
          <p>Are you sure that you want to delete the {entity}?</p>
          <p>
            <strong className="text-red-500">Warning</strong>: this action{" "}
            <strong>cannot</strong> be undone.
          </p>
          <p>
            Type in{" "}
            <i className="text-white/80 select-none pointer-events-none">
              permanently delete{" "}
            </i>{" "}
            to confirm deletion.
          </p>
          <Input value={x} onChange={(e) => setX(e.target.value)} />
        </div>
      </MessageActionModal>
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
        color={color}
      >
        Delete
        <MdDelete className="ml-1" />
      </Button>
    </>
  );
};
