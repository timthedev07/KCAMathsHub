"use client";
import { FC, useCallback, useState } from "react";
import CodeMirror, { ViewUpdate } from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { stex, stexMath } from "@codemirror/legacy-modes/mode/stex";
import { latexTheme } from "../lib/latexTheme";
import { CompletionContext, autocompletion } from "@codemirror/autocomplete";

interface LatexEditorProps {
  value?: string;
  setValue?: string;
}

const autoComplete = (ctx: CompletionContext) => {
  const word = ctx.matchBefore(/\w*/);
  if (!word) return null;
  if (word.from == word.to && !ctx.explicit) return null;
  return {
    from: word.from,
    options: [
      {
        label: "align*",
        type: "keyword",
        apply: "\\begin{align*}\n\\end{align*}",
      },
      { label: "hello", type: "variable", info: "(World)" },
      { label: "magic", type: "text", apply: "⠁⭒*.✩.*⭒⠁", detail: "macro" },
    ],
  };
};

export const LatexEditor: FC<LatexEditorProps> = ({}) => {
  const [value, setValue] = useState<string>("");

  const onChange = useCallback<(val: string, viewUpdate: ViewUpdate) => void>(
    (val, viewUpdate) => {
      console.log("val:", val);
      setValue(val);
    },
    []
  );
  return (
    <div className="flex">
      <CodeMirror
        value={value}
        className="text-sm flex-1"
        height="300px"
        extensions={[
          StreamLanguage.define(stex),
          StreamLanguage.define(stexMath),
          autocompletion({ override: [autoComplete] }),
        ]}
        lang="javascript"
        onChange={onChange}
        theme={latexTheme}
      />
    </div>
  );
};
