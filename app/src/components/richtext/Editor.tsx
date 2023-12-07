"use client";

import "@mdxeditor/editor/style.css";
import "../../styles/mdEditor.css";
import type { ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  tablePlugin,
  InsertTable,
  BlockTypeSelect,
  Separator,
  ListsToggle,
  InsertThematicBreak,
  linkPlugin,
  linkDialogPlugin,
  CreateLink,
} from "@mdxeditor/editor";

export interface EditorExtraProps {}

const rest = [
  headingsPlugin(),
  listsPlugin(),
  quotePlugin(),
  thematicBreakPlugin(),
  markdownShortcutPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  tablePlugin(),
];

const toolbar = toolbarPlugin({
  toolbarContents: () => (
    <>
      <UndoRedo />
      <Separator />
      <BoldItalicUnderlineToggles />
      <Separator></Separator>
      <ListsToggle />
      <Separator />
      <BlockTypeSelect />
      <Separator />
      <CreateLink />
      <InsertTable />
      <InsertThematicBreak />
    </>
  ),
});

// Only import this to the next file
export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      className="dark-theme dark-editor prose"
      plugins={props.readOnly ? rest : [...rest, toolbar]}
      {...props}
      ref={editorRef}
    />
  );
}
