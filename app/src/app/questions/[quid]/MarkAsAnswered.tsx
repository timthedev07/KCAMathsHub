"use client";

import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MessageActionModal } from "../../../components/MessageActionModal";
import { Button } from "../../../components/reusable/Button";
import { trpc } from "../../../trpc/client";

interface MarkAsAnsweredProps {
  isOwner: boolean;
  uid: string;
  quid: string;
}

export const MarkAsAnswered: FC<MarkAsAnsweredProps> = ({
  isOwner,
  uid,
  quid,
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { refresh } = useRouter();

  const { getQuestion } = trpc.useUtils();
  const mutate = trpc.markAsAnswered.useMutation({
    onMutate: async () => {
      await getQuestion.cancel();
      const prev = getQuestion.getData({ quid });
      getQuestion.setData({ quid }, (a) => {
        if (!a) return a;
        return { ...a, answered: true };
      });

      return { prev };
    },
    onError: async (_, __, c) => {
      getQuestion.setData({ quid }, c?.prev);
    },
    onSettled: async () => {
      await getQuestion.invalidate({ quid });
    },
  }).mutateAsync;

  return (
    <>
      <MessageActionModal
        open={modalOpen}
        setOpen={setModalOpen}
        heading="Delete question"
        action={async () => {
          if (isOwner && uid) {
            await mutate(quid);
            refresh();
          }
        }}
      >
        <div className="space-y-6 text-sm">
          <p>This will mark the question as answered; it cannot be undone.</p>
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
        Mark as answered
        <FaCheck className="ml-2 " />
      </Button>
    </>
  );
};
