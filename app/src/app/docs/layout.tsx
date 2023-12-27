import { readdirSync } from "fs";
import { IoDocumentText } from "react-icons/io5";
import { ListDisplay } from "./ListDisplay";

const DIR = "./src/app/docs";

const sharedPadding = "py-8 lg:py-12 xl:py-16";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  const slugs = readdirSync(DIR).filter((v) => !v.includes("."));

  return (
    <div className="grid grid-cols-8">
      <div
        className={`col-start-1 lg:col-end-3 col-end-4 border-r-2 border-slate-600/20 min-h-[90vh] px-10 ${sharedPadding}`}
      >
        <h1 className="text-4xl font-bold flex gap-4">
          <div className="hidden md:flex w-10 h-10 bg-blue-500/20 justify-center items-center p-2 text-blue-500/90 rounded-xl">
            <IoDocumentText />
          </div>
          Guide
        </h1>
        <ul className="list-inside pt-8 flex flex-col h-full">
          <ListDisplay slugs={slugs} />
        </ul>
      </div>
      <div
        className={`col-end-9 lg:col-start-3 col-start-4 min-h-[90vh] ${sharedPadding} px-8 lg:px-12 xl:px-16`}
      >
        {children}
      </div>
    </div>
  );
}
