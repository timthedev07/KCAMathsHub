import { Combobox } from "@headlessui/react";
import { FC, Fragment, useState } from "react";
import { categories } from "../../categories";
import { MAX_CATEGORIES_NUM } from "../../constants/catMax";
import { SharedTransition } from "../shared-styling/inputMenu";

interface CategoryAutoCompleteProps {
  addCategory: (_: string) => void;
  selectedCategories: string[];
  resetOnChange?: boolean;
  widthClassName?: string;
  defaultValue?: string;
  nullable?: boolean;
}

export const CategoryAutoComplete: FC<CategoryAutoCompleteProps> = ({
  addCategory,
  selectedCategories,
  resetOnChange = true,
  widthClassName = "w-1/2",
  defaultValue,
  nullable = false,
}) => {
  const data = categories;
  const [query, setQuery] = useState<string>(defaultValue || "");

  const [selected, setSelected] = useState<string | null>(defaultValue || null);

  const filtered =
    query === ""
      ? data.filter((a) => selectedCategories.findIndex((k) => k === a) < 0)
      : data.filter((category) => {
          return (
            category.toLowerCase().includes(query.toLowerCase()) &&
            selectedCategories.findIndex((k) => k === category) < 0
          );
        });

  return (
    <Combobox
      nullable={nullable as any}
      value={selected}
      onChange={(v) => {
        if (!v) {
          if (nullable) {
            setQuery("");
            setSelected(v);
            addCategory("");
          }
          return;
        }
        // if the value is
        if (
          v &&
          selectedCategories.every((val) => {
            return val !== v;
          }) &&
          selectedCategories.length < MAX_CATEGORIES_NUM
        ) {
          if (!resetOnChange) setSelected(v);
          else setSelected(null);
          addCategory(v);
        } else {
          setSelected(v);
        }
      }}
      disabled={selectedCategories.length >= MAX_CATEGORIES_NUM}
    >
      <Combobox.Input
        className={`rounded-xl text-sm bg-neutral-100/[0.05] rounded-md border-slate-400/10 ${widthClassName} ${
          selectedCategories.length >= MAX_CATEGORIES_NUM
            ? "cursor-not-allowed"
            : ""
        }`}
        placeholder={
          selectedCategories.length >= MAX_CATEGORIES_NUM
            ? "Maximum number of categories reached..."
            : "Select a category"
        }
        onChange={(event) => setQuery(event.target.value)}
      />

      <SharedTransition>
        <Combobox.Options
          className={`rounded-lg border border-slate-400/10 bg-slate-300/[0.04] overflow-hidden ${widthClassName} max-h-96 overflow-y-auto min-w-[250px]`}
        >
          {filtered.length === 0 && query !== "" ? (
            <div className="p-3 cursor-pointer text-white text-sm">
              No categories found
            </div>
          ) : (
            filtered.map((each) => (
              <Combobox.Option key={each} value={each} as={Fragment}>
                {({ active }) => {
                  return (
                    <li
                      className={`p-3 text-sm hover:bg-blue-600/30 hover:text-white hover:font-semibold cursor-pointer transition duration-200 ${
                        active
                          ? "text-white font-semibold bg-blue-600/30"
                          : "text-white/80"
                      } text-sm`}
                    >
                      {each
                        .split(" ")
                        .map((each) =>
                          each.toLowerCase() !== "and"
                            ? each[0].toUpperCase() + each.substring(1)
                            : "and"
                        )
                        .join(" ")}
                    </li>
                  );
                }}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </SharedTransition>
    </Combobox>
  );
};
