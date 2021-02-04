import { BlockData } from "../interfaces/model-value";

export interface VisualEditorComponent {
  key: string;
  label: string;
  preview: () => JSX.Element;
  render: () => JSX.Element;
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
    zIndex: 0,
    adjustPosition: true,
    focus: false,
    width: 0,
    height: 0,
    hasResize: false,
  };
}

export function createVisualEditorConfig() {
  const componentList: VisualEditorComponent[] = [];
  const componentMap: Record<string, VisualEditorComponent> = {};
  return {
    componentList,
    componentMap,
    registry: (key: string, component: Omit<VisualEditorComponent, 'key'>) => {
      const comp = { ...component, key };
      componentList.push(comp);
      componentMap[key] = comp;
    }
  };
}

export type VisualEditorConfig = ReturnType<typeof createVisualEditorConfig>;
