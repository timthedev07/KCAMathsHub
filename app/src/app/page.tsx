import { PageDisplay } from "../components/home/PageDisplay";
import { SSRCaller } from "../server";

const getProps = async () => {
  const { questions } = await SSRCaller.getQuestions({});
  return { questions };
};

const Home = async () => {
  const props = await getProps();

  return <PageDisplay {...props} />;
};

export default Home;
