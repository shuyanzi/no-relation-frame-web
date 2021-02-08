import { BlockData } from "../interfaces/model-value";
import { EditorProps } from "./props";

export interface VisualEditorComponent {
  key: string;
  label: string;
  preview: () => JSX.Element;
  render: (data: {
    props: any;
    model: any;
    size: { width?: number; height?: number };
    custom: Record<string, any>;
  }) => JSX.Element;
  props?: Record<string, EditorProps>;
  model?: Record<string, string>; // 绑定的字段
  resize?: { width?: boolean; height?: boolean };
}

export interface VisualEditorMarkLines {
  x: { left: number; showLeft: number }[];
  y: { top: number; showTop: number }[];
}

export function createNewBlock({
  component,
  left,
  top
}: {
  component: VisualEditorComponent;
  top: number;
  left: number;
}): BlockData {
  return {
    componentKey: component!.key,
    top,
    left,
    adjustPosition: true,
    focus: false,
    zIndex: 0,
    width: 0,
    height: 0,
    hasResize: false,
    props: {},
    model: {},
  };
}

export function createVisualEditorConfig() {
  const componentList: VisualEditorComponent[] = [];
  const componentMap: Record<string, VisualEditorComponent> = {};
  // return {
  //   componentList,
  //   componentMap,
  //   registry: (key: string, component: Omit<VisualEditorComponent, 'key'>) => {
  //     const comp = { ...component, key };
  //     componentList.push(comp);
  //     componentMap[key] = comp;
  //   }
  // };
  return {
    componentList,
    componentMap,
    registry: <
      Props extends Record<string, EditorProps>,
      Model extends Record<string, string> = {}
    >(
      key: string,
      component: {
        label: string;
        preview: () => JSX.Element;
        render: (data: {
          props: { [k in keyof Props]: any };
          model: Partial<{ [key in keyof Model]: any }>;
          size: { width?: number; height?: number };
          custom: Record<string, any>;
        }) => JSX.Element;
        props?: Props;
        model?: Model;
        resize?: { width?: boolean; height?: boolean };
      }
    ) => {
      const comp = { ...component, key };
      componentList.push(comp);
      componentMap[key] = comp;
    },
  };
}

export type VisualEditorConfig = ReturnType<typeof createVisualEditorConfig>;
