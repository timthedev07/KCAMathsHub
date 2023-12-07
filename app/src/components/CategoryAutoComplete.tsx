import { FC, Suspense, useState } from "react";
import { trpc } from "../trpc/client";
import { Combobox } from "@headlessui/react";

interface CategoryAutoCompleteProps {
  addCategory: (_: string) => void;
}

const Component: FC<CategoryAutoCompleteProps> = ({ addCategory }) => {
  const [data] = trpc.getExistingCategories.useSuspenseQuery();
  const [query, setQuery] = useState<string>("");

  const [selected, setSelected] = useState<{ id: number; name: string }>(
    data[0]
  );

  const filtered =
    query === ""
      ? data
      : data.filter((category) => {
          return category.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={selected} onChange={setSelected}>
      <Combobox.Input
        className="bg-slate-900 rounded-md border-slate-200/20"
        onKeyDown={(e) => {
          // on enter, a new category is added
          if (e.key !== "Enter") return;

          addCategory(query);
          setQuery("");
        }}
        onChange={(event) => setQuery(event.target.value)}
      />
      <Combobox.Options>
        {filtered.map((each) => (
          <Combobox.Option key={each.name} value={each.id}>
            {each.name}
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
