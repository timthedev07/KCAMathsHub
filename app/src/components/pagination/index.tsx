"use client";

import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

interface Props {
  currPage: number;
  totalPages: number;
  setCurrPage: Dispatch<SetStateAction<number>>;
  children: ReactNode;
}

const bcn =
  "flex gap-2 items-center text-sm text-white/70 cursor-pointer transition duration-200 hover:text-cyan-500 font-medium disabled:text-white/50 disabled:hover:text-white/50 disabled:cursor-not-allowed";

export const Pagination: FC<Props> = ({
  currPage,
  totalPages,
  setCurrPage,
  children,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div>{children}</div>
      <div className="w-full flex justify-between border-slate-400/10 rounded-lg px-12 xl:px-16 py-3 bg-neutral-300/[0.04] border">
        <button
          className={bcn}
          disabled={currPage <= 1}
          onClick={() => {
            setCurrPage((prev) => Math.max(prev - 1, 1));
          }}
        >
          <FaArrowLeftLong />
          Previous
        </button>
        <span className="text-sm text-center">
          {currPage} of {totalPages}
        </span>
        <button
          className={bcn}
          disabled={currPage >= totalPages}
          onClick={() => {
            setCurrPage((prev) => Math.min(prev + 1, totalPages));
          }}
        >
          Next
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
};
`

`;
