import { categories } from "../categories";
import { PageDisplay } from "../components/home/PageDisplay";
import { SSRCaller } from "../server";
import { StudentStages } from "../types/StudentStage";
import { NextPageParams } from "../types/nextPageParam";

type T = NextPageParams<{}, "q" | "k" | "c">;

const getProps = async (searchParams: T["searchParams"]) => {
  const { k, q, c: c_ } = searchParams;

  if (!!k && !StudentStages.includes(k as any)) {
    return { questions: [] };
  }

  const c = c_?.toString() || undefined;

  if (!!c && !Array.from(categories).includes(c)) {
    return { questions: [] };
  }

  const { questions } = await SSRCaller.getQuestions({
    q: q ? q.toString() : undefined,
    k: (k?.toString() as any) || undefined,
    category: c?.toString() || undefined,
  });
  return { questions };
};

const Home = async ({ searchParams }: T) => {
  const props = await getProps(searchParams);

  return <PageDisplay {...props} />;
};

export default Home;
