import { InfiniteScrollingDisplay } from "../components/home/InfiniteScrollingDisplay";
import { SSRCaller } from "../server";

const getProps = async () => {
  return await SSRCaller.getQuestions({});
};

const Home = async () => {
  const { nextCursor, questions } = await getProps();
  return (
    <div className="flex">
      <aside className="w-3/12 border-r border-slate-600/20 min-h-[90vh]"></aside>
      <InfiniteScrollingDisplay
        nextCursor={nextCursor}
        initialData={questions}
      />
      <aside className="w-3/12 border-l border-slate-600/20 min-h-[90vh]"></aside>
    </div>
  );
};

export default Home;
