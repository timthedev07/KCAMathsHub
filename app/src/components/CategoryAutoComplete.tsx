import { Combobox, Transition } from "@headlessui/react";
import { FC, Fragment, useState } from "react";
import d from "../categories.json";
import { MAX_CATEGORIES_NUM } from "../constants/catMax";

interface CategoryAutoCompleteProps {
  addCategory: (_: string) => void;
  selectedCategories: string[];
}

export const CategoryAutoComplete: FC<CategoryAutoCompleteProps> = ({
  addCategory,
  selectedCategories,
}) => {
  const data = d.categories;
  const [query, setQuery] = useState<string>("");

  const [selected, setSelected] = useState<string | null>(null);

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
      value={selected}
      onChange={(v) => {
        // if the value is
        if (
          v &&
          selectedCategories.every((val) => {
            return val !== v;
          }) &&
          selectedCategories.length < MAX_CATEGORIES_NUM
        ) {
          setSelected(null);
          addCategory(v);
        } else {
          setSelected(v);
        }
      }}
      disabled={selectedCategories.length >= MAX_CATEGORIES_NUM}
    >
      <Combobox.Input
        className={`rounded-xl text-sm bg-neutral-100/[0.05] rounded-md border-slate-400/10 w-1/2 ${
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
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Combobox.Options className="rounded-lg border border-slate-400/10 bg-slate-300/[0.04] overflow-hidden w-1/2 max-h-96 overflow-y-auto min-w-[250px]">
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
      </Transition>
    </Combobox>
  );
};
