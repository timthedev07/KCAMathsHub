"use client";
import { inferProcedureOutput } from "@trpc/server";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEventHandler,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { GrLinkTop } from "react-icons/gr";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";
import { getQuestions } from "../../server/crud/questions/getQuestions";
import { CategoryAutoComplete } from "../categories/CategoryAutoComplete";
import { Button } from "../reusable/Button";
import { Input } from "../reusable/Input";
import { LabelErrorWrapper } from "../reusable/WithLabelWrapper";
import { InputWait } from "./InputWait";
import { InfiniteScrollingDisplay } from "./questions-display/InfiniteScrollingDisplay";

type Props = {
  questions: inferProcedureOutput<typeof getQuestions>["questions"];
};

const searchValidation = z
  .string()
  .trim()
  .min(5, "Type in at least 5 characters")
  .max(48)
  .transform((v) => {
    return v
      .toLowerCase()
      .replaceAll(/[^-\w\d\s:]/gi, "")
      .replaceAll(/(-)\1+/gi, "-")
      .trim();
  });

export const PageDisplay: FC<Props> = ({ questions }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ search?: string }>({});
  const [inputLoading, setInputLoading] = useState<{
    title?: boolean;
    category?: string;
  }>({});

  const setParam = useCallback(
    (key: string, value?: string) => {
      const params = new URLSearchParams(searchParams);
      if (!value && params.has(key)) params.delete(key);
      else if (!!value) params.set(key, value);
      replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, replace]
  );

  const handleSearchChange = useDebouncedCallback<
    ChangeEventHandler<HTMLInputElement>
  >((e) => {
    if (e.target.value.length > 48) {
      e.preventDefault();
    }
    const v = e.target.value;
    if (v.length < 1) {
      setParam("q");
    }

    const parsed = searchValidation.safeParse(v);
    if (parsed.success) {
      setParam("q", parsed.data);
      setErrors((prev) => ({
        ...prev,
        search: undefined,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        search: parsed.error.issues[0].message,
      }));
    }
    setInputLoading((prev) => ({ ...prev, title: false }));
  }, 800);

  useEffect(() => {});

  return (
    <>
      <div className="flex lg:flex-row flex-col">
        <aside
          ref={ref}
          className="w-full lg:w-3/12 lg:border-r border-b border-slate-600/20 lg:min-h-[90vh] py-8 lg:px-4 xl:px-8 gap-8 flex flex-col"
        >
          {/* lg:w-3/12 h-32 border-b lg:border-r border-slate-600/20 lg:min-h-[90vh] lg:h-full */}
          <LabelErrorWrapper
            labelFontSize="text-base"
            label={
              <>
                Title search{" "}
                {inputLoading.title ? (
                  <InputWait className="w-4 h-4 ml-3" />
                ) : null}
              </>
            }
            className="w-9/12 mx-auto min-w-[180px] lg:mx-[unset] lg:w-full"
            error={errors.search}
          >
            <Input
              maxLength={48}
              defaultValue={searchParams.get("q")?.toString()}
              className="text-sm"
              widthClassName="w-full"
              onChange={(e) => {
                if (e.target.value.length < 1) {
                  setParam("q");
                }
                setInputLoading((prev) => ({ ...prev, title: true }));
                handleSearchChange(e);
              }}
            />
          </LabelErrorWrapper>
          <LabelErrorWrapper
            labelFontSize="text-base"
            label="By category"
            className="w-9/12 min-w-[180px] mx-auto lg:mx-[unset] lg:w-full"
          >
            <CategoryAutoComplete
              defaultValue={searchParams.get("c")?.toString() || undefined}
              resetOnChange={false}
              widthClassName="w-full"
              addCategory={(c) => {
                setCategory(c);
                setParam("c", c);
              }}
              selectedCategories={category ? [category] : []}
            />
          </LabelErrorWrapper>
        </aside>
        <div className=" w-full md:w-9/12 md:mx-auto lg:mx-[unset] lg:w-1/2 flex flex-col py-8 px-12 md:px-12 lg:px-16 gap-4 items-center">
          <InfiniteScrollingDisplay
            query={{
              category: searchParams.get("c")?.toString() || undefined,
              k: (searchParams.get("k")?.toString() as any) || undefined,
              q: searchParams.get("q")?.toString() || undefined,
            }}
            initialData={questions}
          />
        </div>
        <aside className="w-3/12 border-l border-slate-600/20 min-h-[90vh] hidden lg:block"></aside>
      </div>
      <div className="fixed right-4 bottom-4 w-60 h-16 bg-[#121212] border border-slate-400/20 rounded-xl">
        <div className="w-full h-full bg-blue-700/10 flex justify-evenly py-3 rounded-xl">
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
