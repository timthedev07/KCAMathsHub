import { FC, Suspense, useState } from "react";
import { trpc } from "../trpc/client";
import { Combobox } from "@headlessui/react";

interface CategoryAutoCompleteProps {
  addCategory: (_: string) => void;
  selectedCategories: string[];
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
      ? data.filter((a) => !selectedCategories.includes(a.name))
      : data.filter((category) => {
          return (
            category.name.toLowerCase().includes(query.toLowerCase()) &&
            !selectedCategories.includes(category.name)
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
            return val !== v.name;
          })
        ) {
          addCategory(v.name);
          setQuery("");
        }
      }}
    >
      <Combobox.Input
        className="bg-neutral-900 rounded-md border-slate-200/20 w-full"
        onChange={(event) => setQuery(event.target.value)}
      />
      <Combobox.Options className="rounded-lg border border-slate-300/20 bg-slate-300/[0.04]">
        {filtered.map((each) => (
          <Combobox.Option
            className="p-3 hover:bg-blue-200/10 cursor-pointer transition duration-200 text-white/80 hover:text-white text-sm hover:font-semibold"
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
        ))}
      </Combobox.Options>
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
