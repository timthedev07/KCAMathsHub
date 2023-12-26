"use client";
import { inferProcedureOutput } from "@trpc/server";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AiFillTool } from "react-icons/ai";
import { GrLinkTop } from "react-icons/gr";
import resolveConfig from "tailwindcss/resolveConfig";
import { useDebouncedCallback } from "use-debounce";
import type { z } from "zod";
import tailwindConfig from "../../../tailwind.config";
import { processQP } from "../../lib/processQueryParam";
import { getQuestions } from "../../server/crud/questions/getQuestions";
import { CategoryAutoComplete } from "../categories/CategoryAutoComplete";
import { Input } from "../reusable/Input";
import { LabelErrorWrapper } from "../reusable/WithLabelWrapper";
import { QStatusSelect } from "../select/q-status-select";
import { SortSelect } from "../select/sort-select";
import { YGSelect } from "../select/year-group-select";
import { InputWait } from "./InputWait";
import { HomePageInfoDisplay } from "./info-display";
import { InfiniteScrollingDisplay } from "./questions-display/InfiniteScrollingDisplay";
import {
  titleSearchValidation,
  userSearchValidation,
} from "./searchInputValidation";
import { HomePageParams } from "./types";

const Button = dynamic(
  async () => (await import("../../components/reusable/Button")).Button,
  {
    ssr: false,
  }
);

type Props = {
  questions: inferProcedureOutput<typeof getQuestions>["questions"];
  initialParams: HomePageParams["searchParams"];
};

const twConfig = resolveConfig(tailwindConfig);

const fieldWrapperCN = "w-9/12 mx-auto min-w-[180px] lg:mx-[unset] lg:w-full";

export const PageDisplay: FC<Props> = ({ questions, initialParams }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ q?: string; u?: string }>({});
  const [showToolbar, setShowToolbar] = useState<boolean>(true);
  const [inputLoading, setInputLoading] = useState<{
    q?: boolean;
    category?: boolean;
    u?: boolean;
  }>({});

  const setParam = useCallback(
    (key: string, value?: string) => {
      const params = new URLSearchParams(searchParams);
      if ((!value || !value.length) && params.has(key)) params.delete(key);
      else if (!!value) params.set(key, value);
      replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, replace]
  );

  const handleSearchChange = useDebouncedCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      maxLen: number,
      validationSchema: z.ZodEffects<z.ZodString, string, string>
    ) => {
      if (e.target.value.length > maxLen) {
        e.preventDefault();
      }
      const key = e.target.name;
      const v = e.target.value;
      if (v.length < 1) {
        setParam(key);
      }

      const parsed = validationSchema.safeParse(v);
      if (parsed.success) {
        setParam(key, parsed.data);
        setErrors((prev) => ({
          ...prev,
          [key]: undefined,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [key]: parsed.error.issues[0].message,
        }));
      }
      setInputLoading((prev) => ({ ...prev, [key]: false }));
    },
    800
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const breakpoint = parseFloat(twConfig.theme.screens.lg.replace("px", ""));

    function listener() {
      setShowToolbar(window.innerWidth > breakpoint);
    }

    window.addEventListener("resize", listener);

    listener();

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  return (
    <>
      <div className="flex lg:flex-row flex-col min-h-[750px]">
        <aside
          ref={ref}
          className={`w-full lg:w-3/12 lg:border-r border-b border-slate-600/20 lg:min-h-[90vh] py-8 lg:px-4 xl:px-8 gap-8 ${
            showToolbar ? "flex flex-col" : "hidden"
          }`}
        >
          <LabelErrorWrapper
            labelFontSize="text-base"
            label="By year group"
            className={fieldWrapperCN}
          >
            <YGSelect
              defaultValue={processQP(searchParams.get("y"))}
              setParam={setParam}
              k={processQP(searchParams.get("k"))}
            />
          </LabelErrorWrapper>
          <LabelErrorWrapper
            labelFontSize="text-base"
            label="By category"
            className={fieldWrapperCN}
          >
            <CategoryAutoComplete
              nullable={true}
              defaultValue={processQP(searchParams.get("c"))}
              resetOnChange={false}
              widthClassName="w-full"
              addCategory={(c) => {
                setCategory(c);
                setParam("c", c);
              }}
              selectedCategories={category ? [category] : []}
            />
          </LabelErrorWrapper>
          <LabelErrorWrapper
            labelFontSize="text-base"
            label="Proposed time"
            className={fieldWrapperCN}
          >
            <SortSelect
              defaultValue={processQP(searchParams.get("s"))}
              setParam={setParam}
            />
          </LabelErrorWrapper>
          <LabelErrorWrapper
            labelFontSize="text-base"
            label="Proposed time"
            className={fieldWrapperCN}
          >
            <QStatusSelect
              defaultValue={processQP(searchParams.get("a"))}
              setParam={setParam}
            />
          </LabelErrorWrapper>
          <LabelErrorWrapper
            labelFontSize="text-base"
            label={
              <>
                Title search{" "}
                {inputLoading.q ? <InputWait className="w-4 h-4 ml-3" /> : null}
              </>
            }
            className={fieldWrapperCN}
            error={errors.q}
          >
            <Input
              maxLength={48}
              defaultValue={processQP(searchParams.get("q"))}
              name="q"
              placeholder="Find by title..."
              className="text-sm"
              widthClassName="w-full"
              onChange={(e) => {
                if (e.target.value.length < 1) {
                  setParam("q");
                }
                setInputLoading((prev) => ({ ...prev, q: true }));
                handleSearchChange(e, 48, titleSearchValidation);
              }}
            />
          </LabelErrorWrapper>

          <LabelErrorWrapper
            labelFontSize="text-base"
            label={
              <>
                By user{" "}
                {inputLoading.u ? <InputWait className="w-4 h-4 ml-3" /> : null}
              </>
            }
            className={fieldWrapperCN}
            error={errors.u}
          >
            <Input
              maxLength={32}
              defaultValue={processQP(searchParams.get("u"))}
              name="u"
              className="text-sm"
              placeholder="Find by user..."
              widthClassName="w-full"
              onChange={(e) => {
                if (e.target.value.length < 1) {
                  setParam("u");
                }
                setInputLoading((prev) => ({ ...prev, u: true }));
                handleSearchChange(e, 32, userSearchValidation);
              }}
            />
          </LabelErrorWrapper>
        </aside>
        <div className="overflow-y-auto h-[90vh] w-full md:w-9/12 md:mx-auto lg:mx-[unset] lg:w-1/2 flex flex-col py-8 px-12 md:px-12 lg:px-8 xl:px-16 gap-4 items-center">
          {questions.length > 0 ? (
            <InfiniteScrollingDisplay
              initialParams={initialParams}
              query={{
                k: processQP(searchParams.get("k")),
                c: processQP(searchParams.get("c")),
                q: processQP(searchParams.get("q")),
                u: processQP(searchParams.get("u")),
                y: processQP(searchParams.get("y")),
                s: processQP(searchParams.get("s")),
                a: processQP(searchParams.get("a")),
              }}
              initialData={questions}
            />
          ) : (
            <>
              <h1 className="text-4xl font-bold mt-48">
                No questions currently...
              </h1>
            </>
          )}
        </div>
        <aside className="w-3/12 border-l border-slate-600/20 min-h-[90vh] hidden lg:block">
          <HomePageInfoDisplay />
        </aside>
      </div>
      <div className="fixed right-4 bottom-4 w-96 lg:w-60 h-16 bg-[#121212] border border-slate-400/20 rounded-xl">
        <div className="w-full h-full bg-blue-700/10 flex justify-evenly py-3 rounded-xl">
          <Button
            className="lg:hidden block"
            onClick={() => {
              setShowToolbar((prev) => !prev);
            }}
          >
            <AiFillTool className="mr-2" />
            Show toolbar
          </Button>
          <Button
            color="indigo"
            onClick={() => {
              const c = ref?.current;
              if (!c) return;
              c.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            <GrLinkTop className="mr-2" />
            Back to top
          </Button>
        </div>
      </div>
    </>
  );
};
