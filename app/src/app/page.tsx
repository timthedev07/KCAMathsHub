import { categories } from "../categories";
import { PageDisplay } from "../components/home/PageDisplay";
import { HomePageParams } from "../components/home/types";
import { getYearGroupsByK } from "../components/select/year-group-select/getDataSet";
import { processQP } from "../lib/processQueryParam";
import { SSRCaller } from "../server";
import { StudentStages } from "../types/StudentStage";

const getProps = async (searchParams: HomePageParams["searchParams"]) => {
  const { k: k_, q: q_, c: c_, u: u_, y: y_, s: s_, a: a_ } = searchParams;

  const k = processQP(k_);
  const c = processQP(c_);
  const q = processQP(q_);
  const u = processQP(u_);
  const s = processQP(s_);
  const a = processQP(a_)?.toLowerCase();
  const y__ = processQP(y_);

  let y = y__ ? parseInt(y__) : undefined;

  if (!!y__ && y && (isNaN(y) || !getYearGroupsByK(k).includes(y))) {
    return { questions: [] };
  }
  if (!!k && !StudentStages.includes(k as any)) {
    return { questions: [] };
  }

  if (!!c && !Array.from(categories).includes(c)) {
    return { questions: [] };
  }

  if (!!a && !["answered", "unanswered"].includes(a)) {
    return { questions: [] };
  }

  const { questions } = await SSRCaller.getQuestions({
    q,
    k,
    c,
    u,
    y: y__,
    s,
    a,
  });
  return { questions };
};

const Home = async ({ searchParams }: HomePageParams) => {
  const { ...props } = await getProps(searchParams);

  return <PageDisplay initialParams={searchParams} {...props} />;
};

export default Home;
