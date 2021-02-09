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
    const props = block.label ? {
      label: block.label,
      labelWidth: '120px'
    } : {
      labelWidth: '0'
    }

    return () => {
      if (FormItemType[block.componentKey]) {
        return <el-form-item prop={modelName} {...props}>{slots.default()}</el-form-item>
      } else {
        return slots.default()
      }
    };
  },
});
