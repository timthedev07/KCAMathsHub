import createTheme, { CreateThemeOptions } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";

const cBase = {
  background: "#232a2f",
  foreground: "#939da5",
  selection: "#939da530",
  selectionMatch: "#204062",
  cursor: "#939da5",
  dropdownBackground: "#1a2023",
  activeLine: "#232a2f",
  matchingBracket: "#204062",
  keyword: "#ba8ef7",
  storage: "#ba8ef7",
  variable: "#939da5",
  parameter: "#939da5",
  function: "#ffea6b",
  string: "#5bec95",
  constant: "#939da5",
  type: "#89ddff",
  class: "#ffea6b",
  number: "#89ddff",
  comment: "#707a84",
  heading: "#5bec95",
  invalid: "#ff6a80",
  regexp: "#56adb7",
  tag: "#c46ffc",
};

const c = {
  ...cBase,
  background: "#000",
  foreground: "#fff",
  selection: "#7d46fc3f",
  selectionMatch: "#7d46fc7f",
  cursor: "#7d46fc",
  dropdownBackground: "#0a0b0f",
  dropdownBorder: "#1e1d27",
  activeLine: "#7d46fc14",
  matchingBracket: "#7d46fc7f",
  variable: "#a8a8b1",
  string: "#a8a8b1",
  comment: "#2e2e37",
  regexp: "#a8a8b1",
};

export const defaultSettingsCopilot: CreateThemeOptions["settings"] = {
  background: c.background,
  foreground: c.foreground,
  caret: c.cursor,
  selection: c.selection,
  selectionMatch: c.selectionMatch,
  gutterBackground: c.background,
  gutterForeground: c.foreground,
  lineHighlight: c.activeLine,
};

export const latexTheme = createTheme({
  theme: "dark",
  settings: defaultSettingsCopilot,
  styles: [
    { tag: t.keyword, color: c.keyword },
    { tag: [t.name, t.deleted, t.character, t.macroName], color: c.variable },
    { tag: [t.propertyName], color: c.function },
    {
      tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
      color: c.string,
    },
    { tag: [t.function(t.variableName), t.labelName], color: c.function },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: c.constant,
    },
    { tag: [t.definition(t.name), t.separator], color: c.variable },
    { tag: [t.className], color: c.class },
    {
      tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: c.number,
    },
    { tag: [t.typeName], color: c.type, fontStyle: c.type },
    { tag: [t.operator], color: c.keyword },
    { tag: [t.url, t.escape, t.regexp, t.link], color: c.regexp },
    { tag: [t.meta, t.comment], color: c.comment },
    { tag: t.tagName, color: c.tag },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.link, textDecoration: "underline" },
    { tag: t.heading, fontWeight: "bold", color: c.heading },
    { tag: [t.atom, t.special(t.variableName)], color: c.variable },
    { tag: t.invalid, color: c.invalid },
    { tag: t.strikethrough, textDecoration: "line-through" },
    {
      tag: [t.operatorKeyword, t.bool, t.null, t.variableName],
      color: c.constant,
    },
  ],
});
