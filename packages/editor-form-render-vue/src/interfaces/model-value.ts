import { Rules } from 'async-validator'
export interface ModelValue {
  container: {
    width: number;
    height: number;
  };
  blocks: BlockData[];
}

export interface BlockData {
  top: number;
  left: number;
  componentKey: string;
  adjustPosition: boolean; // 是否需要调整位置
  focus: boolean; // 是否是选中状态
  zIndex: number; // z-index值
  width: number;
  height: number;
  hasResize: boolean; // 是否调整过宽高
  props: Record<string, any>; // 组件的设计属性
  model: Record<string, any>; // 绑定的字段
  slotName?: string; // 组件唯一标识
  rules?: Rules; // 组件验证规则
}