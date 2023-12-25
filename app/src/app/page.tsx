import { categories } from "../categories";
import { PageDisplay } from "../components/home/PageDisplay";
import { SSRCaller } from "../server";
import { StudentStages } from "../types/StudentStage";
import { NextPageParams } from "../types/nextPageParam";

type T = NextPageParams<{}, "q" | "k" | "c" | "u">;

const getProps = async (searchParams: T["searchParams"]) => {
  const { k: k_, q: q_, c: c_, u: u_ } = searchParams;

  const k = k_?.toString() || undefined;
  const c = c_?.toString() || undefined;
  const q = q_?.toString() || undefined;
  const u = u_?.toString() || undefined;

  if (!!k && !StudentStages.includes(k as any)) {
    return { questions: [] };
  }

  if (!!c && !Array.from(categories).includes(c)) {
    return { questions: [] };
  }

  const { questions } = await SSRCaller.getQuestions({
    q,
    k,
    c: c?.toString() || undefined,
    u,
  });
  return { questions };
};

const Home = async ({ searchParams }: T) => {
  const props = await getProps(searchParams);

  return <PageDisplay {...props} />;
};

export default Home;
