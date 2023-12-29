import { Metadata } from "next";
import { HOST } from "./hostAddr";

type Options = {
  title?: string;
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
  const title = title_ ? `${title_} | KCAMathsHub` : `KCAMathsHub`;

  return {
    title,
    description,
    keywords: ["math", "qa-platform", ...categories],
    authors: [{ name: "Tim", url: "https://timthedev07.vercel.app" }],
    applicationName: "KCAMathsHub",
    other: {
      "google-site-verification": "ou31BwzL6hYs78yHQZrfEFRvZIBWxVoPkErFfm0f2z4",
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${HOST}${pathName}`,
    },
  } as Metadata;
};
