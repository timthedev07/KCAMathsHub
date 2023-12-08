"use client";

import "@mdxeditor/editor/style.css";
import "../../styles/mdEditor.css";
import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { forwardRef } from "react";

const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
});

export const QAEditor = forwardRef<MDXEditorMethods, MDXEditorProps>(
  (props, ref) => <Editor {...props} editorRef={ref} />
);

QAEditor.displayName = "ForwardRefEditor";
