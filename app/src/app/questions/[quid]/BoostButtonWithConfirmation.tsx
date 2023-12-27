"use client";

import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { HiChevronDoubleUp } from "react-icons/hi";
import { MessageActionModal } from "../../../components/helpers/message-action-modal";
import { TimedMessageToast } from "../../../components/helpers/time-message-toast";
import { Button } from "../../../components/reusable/Button";
import { trpc } from "../../../trpc/client";

interface MarkAsAnsweredProps {
  isOwner: boolean;
  uid: string;
  quid: string;
}

export const BoostButtonWithConfirmation: FC<MarkAsAnsweredProps> = ({
  isOwner,
  uid,
  quid,
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<boolean>(false);
  const { refresh } = useRouter();

  const mutate = trpc.boostQuestion.useMutation().mutateAsync;

  return (
    <>
      <TimedMessageToast level="error" setShow={setToast} show={toast}>
        Failed to boost question.
      </TimedMessageToast>
      <MessageActionModal
        open={modalOpen}
        setOpen={setModalOpen}
        heading="Delete question"
        action={async () => {
          if (isOwner && uid) {
            const res = await mutate({ quid, uid });
            if (res.success) refresh();
            else {
              setToast(true);
            }
          }
        }}
      >
        <div className="space-y-6 text-sm text-white/80">
          <p>
            By boosting this question, you agree to spend{" "}
            <strong className="text-white">50</strong> credits. It cannot be
            undone.
          </p>
          <p>
            If this operation is executed by accident, please contact our team
            for further discussion.
          </p>
        </div>
      </MessageActionModal>
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
        color="blue"
      >
        Boost question
        <HiChevronDoubleUp className="ml-2 " />
      </Button>
    </>
  );
};
