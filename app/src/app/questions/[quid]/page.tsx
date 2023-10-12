import { NextPage } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { SSRCaller } from "../../../server";
import { redirect } from "next/navigation";
import { pageURLs } from "../../../lib/pageURLGen";
import Image from "next/image";

interface Props {
  params: { quid: string };
}

const getSSRProps = async (quid: string) => {
  const session = await getServerSession(authOptions);
  const question = await SSRCaller.getQuestion({ quid });

  if (!question) {
    redirect(pageURLs.error("Question not found..."));
  }

  return { u: session?.user, question };
};

const Question: NextPage<Props> = async ({ params: { quid } }) => {
  const { question } = await getSSRProps(quid);

  return (
    <div>
      <div className="dev-border-cyan p-12 w-full flex-col flex gap-8">
        <h1 className="font-semibold text-5xl break-words">{question.title}</h1>
        <p className="break-words w-full">{question.content}</p>
        <ul className="flex dev-border-green gap-8 p-4 h-96">
          {question.attachments.map((each) => (
            <li
              key={each.name + each.imgUrl}
              className="h-full w-96 dev-border-red relative"
            >
              <Image
                alt={each.name || "Attachment"}
                src={each.imgUrl}
                fill={true}
                className="object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Question;
