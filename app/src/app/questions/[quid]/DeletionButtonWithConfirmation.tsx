"use client";

import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MessageActionModal } from "../../../components/MessageActionModal";
import { Button } from "../../../components/reusable/Button";
import { Input } from "../../../components/reusable/Input";
import { trpc } from "../../../trpc/client";

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
  const [x, setX] = useState<string>("");
  const { getQuestion } = trpc.useUtils();
  const mutate = trpc.deleteQuestion.useMutation({
    onSuccess: async () => {
      await getQuestion.invalidate({ quid });
    },
  }).mutateAsync;
  return (
    <>
      <MessageActionModal
        proceedDisabled={x !== "permanently delete"}
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
            <strong className="text-red-500">Warning</strong>: this action{" "}
            <strong>cannot</strong> be undone.
          </p>
          <p>
            Type in <i className="text-white/80">permanently delete </i> to
            confirm deletion.
          </p>
          <Input value={x} onChange={(e) => setX(e.target.value)} />
        </div>
      </MessageActionModal>
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
        color="dark"
      >
        Delete
        <MdDelete className="ml-2" />
      </Button>
    </>
  );
};
