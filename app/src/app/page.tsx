import { KSList } from "../components/home/ks-list";
import { HPQuestionsDisplay } from "../components/home/questions-display";
import { SSRCaller } from "../server";
import { StudentStageType, StudentStages } from "../types/StudentStage";

const getProps = async (k?: string | null) => {
  let _k;
  if (k && StudentStages.includes(k as any)) {
    _k = k as StudentStageType;
  }

  const res = await SSRCaller.getQuestions({ category: _k });
  console.log(res);
  return res;
};

const Home = async ({
  searchParams: { k },
}: {
  searchParams: { k?: string | null };
}) => {
  const { questions } = await getProps(k);

  return (
    <div className="flex lg:flex-row flex-col">
      <aside className="lg:w-3/12 h-64 border-b lg:border-r border-slate-600/20 lg:min-h-[90vh]">
        <KSList />
      </aside>
      <div className="w-full md:w-9/12 md:mx-auto lg:mx-[unset] lg:w-1/2 flex flex-col py-8 px-12 md:px-12 lg:px-16 gap-4 items-center">
        <HPQuestionsDisplay initialData={questions} />
      </div>
      <aside className="w-3/12 border-l border-slate-600/20 min-h-[90vh] hidden lg:block"></aside>
    </div>
  );
};

export default Home;
