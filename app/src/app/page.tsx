import { HPQuestionsDisplay } from "../components/home/questions-display";
import { SSRCaller } from "../server";

const getProps = async () => {
  return await SSRCaller.getQuestions({});
};

const Home = async () => {
  const { nextCursor, questions } = await getProps();
  return (
    <div className="flex">
      <aside className="w-4/12 lg:w-3/12 border-r border-slate-600/20 min-h-[90vh]"></aside>
      <div className="w-8/12 lg:w-1/2 flex flex-col py-8 px-12 md:px-12 lg:px-16 gap-4 items-center">
        <HPQuestionsDisplay nextCursor={nextCursor} initialData={questions} />
      </div>
      <aside className="w-3/12 border-l border-slate-600/20 min-h-[90vh] hidden lg:block"></aside>
    </div>
  );
};

export default Home;
