export enum VisualEditorPropsType {
  input = "input",
  color = "color",
  select = "select",
  table = "table",
}

export interface EditorProps {
  type: VisualEditorPropsType;
  label: string;
  options?: VisualEditorSelectOptions;
  table?: VisualEditorTableOptions;
}

/** ------input------- */

export function createEditorInputProps(label: string): EditorProps {
  return {
    type: VisualEditorPropsType.input,
    label,
  };
}

/** ------color------- */

export function createEditorColorProps(label: string): EditorProps {
  return {
    type: VisualEditorPropsType.color,
    label,
  };
}

/** ------select------- */

export type VisualEditorSelectOptions = {
  label: string;
  val: string;
}[];

export function createEditorSelectProps(
  label: string,
  options: VisualEditorSelectOptions
): EditorProps {
  return {
    type: VisualEditorPropsType.select,
    label,
    options,
  };
}

/** ------table------- */

export type VisualEditorTableOptions = {
  options: {
    label: string;
    field: string; // 列绑定字段
  }[];
  showKey: string;
};

export function createEditorTableProp(
  label: string,
  options: VisualEditorTableOptions
) {
  return {
    type: VisualEditorPropsType.table,
    label,
    table: options,
  };
}
