"use client";

import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { trpc } from "../../trpc/client";
import { MessageActionModal } from "../helpers/MessageActionModal";
import { Button } from "../reusable/Button";

interface AcceptButtonWithConfirmationProps {
  quid: string;
  aid: string;
  onSuccess?: Function;
  color?: string;
  currPage: number;
}

export const AcceptButtonWithConfirmation: FC<
  AcceptButtonWithConfirmationProps
> = ({ quid, aid, color = "blue", onSuccess, currPage }) => {
  const { refresh } = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { getQuestion, getQuestionAnswers } = trpc.useUtils();

  const mutate = trpc.acceptAnswer.useMutation({
    onMutate: async () => {
      const search = { quid, pageNum: currPage };
      await getQuestionAnswers.cancel();
      await getQuestion.cancel({ quid });

      const prevX = getQuestionAnswers.getData(search);
      getQuestionAnswers.setData(search, (a) => {
        if (!a) return a;
        return {
          ...a,
          answers: a.answers.map((each) =>
            each.id === aid ? { ...each, accepted: true } : each
          ),
        };
      });

      const prevY = getQuestion.getData({ quid });
      getQuestion.setData({ quid }, (a) => {
        if (!a) return a;
        return {
          ...a,
          answered: true,
        };
      });

      return { prevX, prevY };
    },
    onError: async (_, __, c) => {
      getQuestionAnswers.setData({ quid, pageNum: currPage }, c?.prevX);
      getQuestion.setData({ quid }, c?.prevY);
    },
    onSettled: async () => {
      await getQuestionAnswers.invalidate({ quid, pageNum: currPage });
      await getQuestion.invalidate({ quid });
    },
  }).mutateAsync;

  return (
    <>
      <MessageActionModal
        open={modalOpen}
        setOpen={setModalOpen}
        heading={`Accept answer`}
        action={async () => {
          const { success } = await mutate({ quid, aid });

          switch (success) {
            case true: {
              refresh();
              if (onSuccess) onSuccess();
            }
            case false: {
              // TODO: error handling
            }
          }
        }}
      >
        <div className="space-y-6 text-sm">
          <p>
            Does this answer solve your problem? Only proceed if you are
            certain.
          </p>
          <p>
            <strong className="text-red-500">Warning</strong>: this action{" "}
            <strong>cannot</strong> be undone.
          </p>
        </div>
      </MessageActionModal>
      <Button color={color} onClick={() => setModalOpen(true)}>
        Accept <FaCheck className="ml-2" />
      </Button>
    </>
  );
};
