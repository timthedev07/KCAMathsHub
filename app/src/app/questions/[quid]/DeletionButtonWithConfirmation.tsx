"use client";

import { FC, useState } from "react";
import { Button } from "../../../components/reusable/Button";
import { MessageActionModal } from "../../../components/MessageActionModal";
import { trpc } from "../../../trpc/client";
import { useRouter } from "next/navigation";

interface DeletionButtonWithConfirmationProps {
  isOwner: boolean;
  uid: string;
  quid: string;
}

export const DeletionButtonWithConfirmation: FC<
  DeletionButtonWithConfirmationProps
> = ({ isOwner, uid, quid }) => {
  const { push } = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { getQuestion } = trpc.useUtils();
  const mutate = trpc.deleteQuestion.useMutation({
    onSuccess: async () => {
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
            await mutate({
              quid,
              uid,
            });
            push("/");
          }
        }}
      >
        <div className="space-y-6 text-sm">
          <p>Are you sure that you want to delete the question?</p>
          <p>
            <strong>Warning</strong>: this action <strong>cannot</strong> be
            undone.
          </p>
        </div>
      </MessageActionModal>
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
        color="dark"
      >
        Delete
      </Button>
    </>
  );
};
