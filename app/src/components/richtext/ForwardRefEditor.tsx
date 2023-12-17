"use client";

import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import dynamic from "next/dynamic";
import { forwardRef } from "react";
import "../../styles/mdEditor.css";

const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
});

export const QAEditor = forwardRef<MDXEditorMethods, MDXEditorProps>(
  (props, ref) => <Editor {...props} editorRef={ref} />
);

QAEditor.displayName = "ForwardRefEditor";
