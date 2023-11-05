"use client";
import { FC, useCallback, useState } from "react";
import CodeMirror, { ViewUpdate } from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { stex, stexMath } from "@codemirror/legacy-modes/mode/stex";
import { latexTheme } from "../lib/latexTheme";

interface LatexEditorProps {
  value?: string;
  setValue?: string;
}

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
    <CodeMirror
      value={value}
      className="text-sm"
      height="200px"
      extensions={[
        StreamLanguage.define(stex),
        // StreamLanguage.define(stexMath),
      ]}
      lang="javascript"
      onChange={onChange}
      theme={latexTheme}
    />
  );
};
