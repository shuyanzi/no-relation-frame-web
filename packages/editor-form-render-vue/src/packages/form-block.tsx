import { computed, defineComponent, onMounted, PropType, ref, Slot } from 'vue';
import { BlockData } from '../interfaces/model-value';
import {
  VisualEditorConfig
} from '../lib/utils';

export const FormBlock = defineComponent({
  name: 'FormBlock',
  props: {
    block: {
      type: Object as PropType<BlockData>,
      required: true
    },
    config: {
      type: Object as PropType<VisualEditorConfig>,
      required: true
    },
    formData: { type: Object as PropType<Record<string, any>>, required: true },
    slots: {
      type: Object as PropType<Record<string, Slot | undefined>>,
      required: true,
    },
    customProps: { type: Object as PropType<Record<string, any>> },
    formDataChange: { type: Function, required: true }
  },
  setup(props) {
    const el = ref({} as HTMLDivElement);

    const classes = computed(() => [
      'editor-block',
      {
        'editor-block-focus': props.block.focus,
      }
    ])
    
    const style = computed(() => ({
      top: `${props.block?.top}px`,
      left: `${props.block?.left}px`,
      zIndex: props.block.zIndex
    }));

    onMounted(() => {
      const { block } = props;
      if (block.adjustPosition) {
        const { offsetWidth, offsetHeight } = el.value;
        block.left = block.left - offsetWidth / 2;
        block.top = block.top - offsetHeight / 2;
        block.adjustPosition = false;
      }
    });

    return () => {
      // const component = props.config.componentMap[props.block.componentKey];
      // console.log({ componentKey: props.block.componentKey, config: props.config, component })
      // if (!component) return (<div>123</div>);
      // const Render = component.render();
      const component = props.config?.componentMap[props.block!.componentKey];
      const formData = props.formData as Record<string, any>;
      let render: any;
      if (props.block?.slotName && props.slots[props.block.slotName]) {
        render = props.slots[props.block.slotName]!();
      } else {
        render = component?.render({
          size: props.block?.hasResize
            ? {
                width: props.block.width,
                height: props.block.height,
              }
            : {},
          props: props.block?.props || {},
          /**@ts-ignore */
          model: Object.keys(component.model || {}).reduce((prev, propName) => {
            const modelName = !props.block?.model ? null : props.block?.model[propName];
            prev[propName] = {
              [propName === "default" ? "modelValue" : propName]: props.formData[modelName],
              [propName === "default" ? "onUpdate:modelValue" : "onChange"]: (val: any) => {
                props.formDataChange(modelName, { oldValue: formData[modelName], newValue: val })
                formData[modelName] = val
              },
            };
            return prev;
          }, {} as Record<string, any>),
          custom:
            !props.block?.slotName || !props.customProps
              ? {}
              : props.customProps[props.block?.slotName] || {},
        });
      }
      return (
        <div class={classes.value} style={style.value} ref={el}>
          {render}
        </div>
      );
    };
  }
});
