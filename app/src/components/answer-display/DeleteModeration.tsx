import { useSession } from "next-auth/react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { MdDelete } from "react-icons/md";
import { trpc } from "../../trpc/client";
import { MessageActionModal } from "../helpers/message-action-modal";
import { Button } from "../reusable/Button";
import { Input } from "../reusable/Input";
import { Arg } from "./type";

interface DeleteModerationProps {
  color: string;
  aid: string;
  moderationId: string;
  setState: Dispatch<SetStateAction<Arg | null | undefined>>;
}

export const DeleteModeration: FC<DeleteModerationProps> = ({
  color,
  aid,
  moderationId,
  setState,
}) => {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [x, setX] = useState<string>("");
  const { getModerations } = trpc.useUtils();
  const mutate = trpc.deleteModeration.useMutation({
    onMutate: async () => {
      // cancel
      await getModerations.cancel({ aid });
      // get data and store as prev
      const prev = getModerations.getData({ aid });
      // set data
      getModerations.setData({ aid }, (v) => {
        if (!v) return v;
        const after = v.filter((each) => each.id !== moderationId);
        setState({ aid, mods: after });
        return after;
      });

      return { prev };
    },
    onError: async (_, __, c) => {
      // fallback in case of error; reset to prev
      getModerations.setData({ aid }, c?.prev);
    },
    onSettled: async () => {
      // invalidate on settled
      getModerations.invalidate({ aid });
    },
  }).mutateAsync;

  return (
    <>
      <MessageActionModal
        proceedDisabled={x !== "permanently delete"}
        open={modalOpen}
        setOpen={setModalOpen}
        heading="Delete moderation"
        action={async () => {
          if (!session) return;
          await mutate({ aid, moderationId, userId: session?.user.id });
        }}
      >
        <div className="space-y-6 text-sm">
          <p>Are you sure that you want to delete the moderation?</p>
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
