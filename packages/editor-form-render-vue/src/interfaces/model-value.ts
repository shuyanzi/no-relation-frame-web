export interface ModelValue {
  container: {
    width: number;
    height: number;
  };
  blocks: BlockData[];
}

export interface BlockData {
  zIndex: number; // z-index值
  componentKey: string; // 组件类型
  top: number;
  left: number;
  adjustPosition?: boolean; // 是否需要调整位置
  focus: boolean; // 当前是否为选中状态
  width: number; // 组件宽度
  height: number; // 组件高度
  hasResize: boolean; // 是否调整过宽度或者高度
}