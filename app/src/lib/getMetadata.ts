import { Metadata } from "next";
import { HOST } from "./hostAddr";

type Options = {
  title: string;
  description: string;
  categories?: string[];
  pathName?: string;
};

export const getMetadata = ({
  categories = [],
  description,
  title: title_,
  pathName,
}: Options) => {
  const title = `${title_} | KCAMathsHub`;

  return {
    title,
    description,
    keywords: ["math", "qa-platform", ...categories],
    authors: [{ name: "Tim", url: "https://timthedev07.vercel.app" }],
    openGraph: {
      type: "article",
      title,
      description,
      url: `${HOST}${pathName}`,
    },
  } as Metadata;
};
