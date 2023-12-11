import { FC, Suspense, useState } from "react";
import { trpc } from "../trpc/client";
import { Combobox, Transition } from "@headlessui/react";
import { MAX_CATEGORIES_NUM } from "../constants/catMax";

interface CategoryAutoCompleteProps {
  addCategory: (_: { id: number; name: string }) => void;
  selectedCategories: { id: number; name: string }[];
}

const Component: FC<CategoryAutoCompleteProps> = ({
  addCategory,
  selectedCategories,
}) => {
  const [data] = trpc.getExistingCategories.useSuspenseQuery();
  const [query, setQuery] = useState<string>("");

  const [selected, setSelected] = useState<{ id: number; name: string }>(
    data[0]
  );

  const filtered =
    query === ""
      ? data.filter(
          (a) =>
            selectedCategories.findIndex(
              (k) => k.id === a.id && k.name === a.name
            ) < 0
        )
      : data.filter((category) => {
          return (
            category.name.toLowerCase().includes(query.toLowerCase()) &&
            selectedCategories.findIndex(
              (k) => k.id === category.id && k.name === category.name
            ) < 0
          );
        });

  return (
    <Combobox
      value={selected}
      onChange={(v) => {
        setSelected(v);
        // if the value is
        if (
          selectedCategories.every((val) => {
            return val.name !== v.name;
          }) &&
          selectedCategories.length < MAX_CATEGORIES_NUM
        ) {
          addCategory(v);
          setQuery("");
        }
      }}
      disabled={selectedCategories.length >= MAX_CATEGORIES_NUM}
    >
      <Combobox.Input
        className="rounded-xl text-sm bg-neutral-100/[0.05] rounded-md border-slate-200/20 w-1/2"
        placeholder="Select a category"
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
        <Combobox.Options className="rounded-lg border border-slate-300/20 bg-slate-300/[0.04]">
          {filtered.length === 0 && query !== "" ? (
            <div className="p-3 cursor-pointer text-white text-sm">
              No categories found
            </div>
          ) : (
            filtered.map((each) => (
              <Combobox.Option
                className="p-3 text-sm hover:bg-blue-200/10 cursor-pointer transition duration-200 text-white/80 hover:text-white text-sm hover:font-semibold"
                key={each.name}
                value={each}
              >
                {each.name
                  .split(" ")
                  .map((each) =>
                    each.toLowerCase() !== "and"
                      ? each[0].toUpperCase() + each.substring(1)
                      : "and"
                  )
                  .join(" ")}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
};

export const CategoryAutoComplete: FC<CategoryAutoCompleteProps> = (props) => {
  return (
    <Suspense fallback="...">
      <Component {...props} />
    </Suspense>
  );
};
