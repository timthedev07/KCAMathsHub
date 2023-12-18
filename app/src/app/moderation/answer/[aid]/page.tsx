import dynamic from "next/dynamic";
import { FormEvent } from "react";
import { z } from "zod";
import { LoadingSpin } from "../../../../components/LoadingSpin";
import { LabelErrorWrapper } from "../../../../components/reusable/WithLabelWrapper";
import { QAEditor } from "../../../../components/richtext/ForwardRefEditor";
import { StyledWrapper } from "../../../../components/richtext/StyledWrapper";
import { useForm } from "../../../../hooks/useForm";
import { NextPageParams } from "../../../../types/nextPageParam";
import { NextPage } from "../../../../types/nextpage";

const QuestionDisplay = dynamic(() => import("./QuestionDisplay"), {
  ssr: false,
  loading: () => <LoadingSpin />,
});

const ModerateQuestionPage: NextPage<NextPageParams<{ aid: string }>> = ({
  params: { aid },
}) => {
  const { changed, errors, formData, update } = useForm({
    defaultValues: {
      comment: "",
      approved: false,
    },
    validationSchema: z.object({}),
  });

  const handleSubmit = (e: FormEvent) => {};

  return (
    <div className="flex gap-4">
      <div>
        <QuestionDisplay aid={aid} />
      </div>
      <form onSubmit={handleSubmit}>
        <LabelErrorWrapper error={errors.comment} label="Comment">
          <StyledWrapper>
            <QAEditor
              markdown={formData.comment}
              onChange={(val) => {
                update("comment", val);
              }}
            />
          </StyledWrapper>
        </LabelErrorWrapper>
      </form>
    </div>
  );
};

export default ModerateQuestionPage;
