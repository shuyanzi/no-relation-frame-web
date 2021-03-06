import { defineComponent, ref, watch } from "vue";

// 用jsx封装组件的时候，实现双向数据绑定
export function useModel<T>(getter: () => T, emitter: (val: T) => void) {
  const state = ref(getter()) as { value: T };

  watch(getter, (val) => {
    console.log('val getter:', getter)
    if (val !== state.value) {
      state.value = val;
    }
  });

  return {
    get value() {
      return state.value;
    },
    set value(val: T) {
      if (state.value !== val) {
        state.value = val;
        emitter(val);
      }
    },
  };
}

// modelValue 外部可以用v-model绑定
export const TestUseModel = defineComponent({
  props: {
    modelValue: { type: String },
  },
  emits: {
    "update:modelValue": (val?: string) => true,
  },
  setup(props, ctx) {
    const model = useModel(() => props.modelValue, newValue => ctx.emit('update:modelValue', newValue));
    return () => (
      <div>
        自定义输入框
        <input type="text" v-model={model.value} />
      </div>
    );
  },
});
