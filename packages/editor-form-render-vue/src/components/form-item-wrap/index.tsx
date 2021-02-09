import { defineComponent, PropType } from "vue";
import { FormItemType } from "../../enums/common";
import { BlockData } from "../../interfaces/model-value";

export const FormItemWrap = defineComponent({
  props: {
    block: {
      type: Object as PropType<BlockData>,
      required: true
    },
  },
  setup({ block }, { slots }) {
    const modelName = !block?.model ? null : block?.model.modelValue || block?.model.default || null;

    return () => {
      if (FormItemType[block.componentKey]) {
        return <el-form-item prop={modelName} label-width="0">{slots.default()}</el-form-item>
      } else {
        return slots.default()
      }
    };
  },
});
