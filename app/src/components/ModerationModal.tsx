import { ToggleSwitch } from "flowbite-react";
import { useSession } from "next-auth/react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useForm } from "../hooks/useForm";
import { anyError } from "../lib/anyError";
import { ModerationFormSchema } from "../schema/moderation";
import { trpc } from "../trpc/client";
import { MessageActionModal } from "./helpers/MessageActionModal";
import { LabelErrorWrapper } from "./reusable/WithLabelWrapper";
import { QAEditor } from "./richtext/ForwardRefEditor";
import { StyledWrapper } from "./richtext/StyledWrapper";

interface ModerationModalProps {
  aid?: string | null;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  answerCurrPage: number | null;
  quid: string;
}

export const ModerationModal: FC<ModerationModalProps> = ({
  aid,
  answerCurrPage,
  quid,
  ...rest
}) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const { formData, update, errors, changed } = useForm({
    defaultValues: { anonymous: false, moderationComment: "", approval: false },
    validationSchema: ModerationFormSchema,
  });
  const { getQuestionAnswers } = trpc.useUtils();
  const mutate = trpc.moderate.useMutation({
    onMutate: async () => {
      if (!answerCurrPage) return null;

      const search = { quid, pageNum: answerCurrPage };

      await getQuestionAnswers.cancel(search);
      const prev = getQuestionAnswers.getData(search);
      getQuestionAnswers.setData(search, (p) => {
        if (!p) return { answers: [], lastPageSize: 0, totalPages: 0 };

        return {
          lastPageSize: p?.lastPageSize || 0,
          totalPages: p?.totalPages || 0,
          answers: p?.answers
            ? p.answers.map((v) =>
                v.id === aid
                  ? {
                      ...v,
                      moderated: true,
                      moderations: [
                        {
                          ...formData,
                          moderator: { username: session?.user.username || "" },
                        },
                        ...v.moderations,
                      ],
                    }
                  : v
              )
            : [],
        };
      });

      return prev;
    },
    onError: async (_, __, ctx) => {
      if (!answerCurrPage || !ctx) return;
      getQuestionAnswers.setData({ quid, pageNum: answerCurrPage }, ctx);
    },
    onSuccess: async () => {
      if (!answerCurrPage) return;
      getQuestionAnswers.invalidate({ quid, pageNum: answerCurrPage });
    },
  }).mutateAsync;

  const handleSubmit = async () => {
    const u = session?.user;
    if (!u) return;
    if (!aid || !answerCurrPage) return;
    if (anyError(errors, changed)) {
      return;
    }
    setLoading(true);
    await mutate({ ...formData, answerId: aid, moderatorId: u.id });
    setLoading(false);
  };

  if (!aid) return null;

  return (
    <MessageActionModal
      {...rest}
      modalSize="4xl"
      heading="Moderate answer"
      action={handleSubmit}
      proceedDisabled={loading}
    >
      <div className="flex flex-col gap-5 xl:p-8">
        <LabelErrorWrapper
          labelFontWeight="font-medium"
          className="w-full"
          labelFontSize="text-sm"
          label="Comment"
          error={errors.moderationComment}
        >
          <StyledWrapper className="w-full">
            <QAEditor
              markdown={formData.moderationComment}
              autoFocus
              onChange={(v) => update("moderationComment", v)}
            />
          </StyledWrapper>
        </LabelErrorWrapper>
        <div className="flex justify-between w-64">
          <LabelErrorWrapper
            labelFontWeight="font-medium"
            labelFontSize="text-sm"
            label="Approval"
          >
            <ToggleSwitch
              checked={formData.approval}
              onChange={(val) => {
                update("approval", val);
              }}
              color="success"
            />
          </LabelErrorWrapper>
          <LabelErrorWrapper
            labelFontWeight="font-medium"
            labelFontSize="text-sm"
            label="Anonymous"
          >
            <ToggleSwitch
              checked={formData.anonymous}
              onChange={(val) => {
                update("anonymous", val);
              }}
              color="info"
            />
          </LabelErrorWrapper>
        </div>
      </div>
    </MessageActionModal>
  );
};
