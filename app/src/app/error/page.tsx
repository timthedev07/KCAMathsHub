import { Metadata } from "next";
import { getMetadata } from "../../lib/getMetadata";
import { truncateAtWord } from "../../lib/truncateAtWord";
import { NextPage } from "../../types/nextpage";
import { Content } from "./Content";

export async function generateMetadata({
  searchParams: { err },
}: {
  searchParams: { err?: string[] | string | null };
}): Promise<Metadata> {
  return getMetadata({
    title: err ? `${truncateAtWord(err.toString(), 48)}` : "Error",
    description: truncateAtWord(err?.toString() || "", 60),
  });
}

const ErrorPage: NextPage = () => {
  return (
    <div className="w-full h-[90vh] flex justify-center items-center flex-col gap-8">
      <h1 className="text-6xl text-red-400 font-bold">Blunder...</h1>
      <Content />
    </div>
  );
};

export default ErrorPage;
