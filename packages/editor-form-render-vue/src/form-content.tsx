import { computed, defineComponent, PropType } from 'vue';
import { ModelValue } from './interfaces/model-value';
import { FormBlock } from './packages/form-block';
import { visualConfig } from './lib/config';

const FormContent = defineComponent({
  name: 'AFormContent',
  props: {
    modelValue: {type: Object as PropType<ModelValue>, required: true},
    formData: { type: Object as PropType<Record<string, any>>, required: true },
    // 自定义事件
    customProps: { type: Object as PropType<Record<string, any>> },
  },
  setup(props, ctx) {
    const { modelValue } = props
    const containerStyles = computed(() => ({
      width: `${modelValue.container.width}px`,
      height: `${modelValue.container.height}px`
    }))
    console.log({ modelValue })

    return () => {
      return (
        <div class='form-container' style={containerStyles.value}>
          vue component 来了~~~~
          {!!modelValue.blocks && (
            modelValue.blocks.map((block, index) => (
              <FormBlock
                block={block}
                key={index}
                config={visualConfig}
                formData={props.formData}
                slots={ctx.slots}
                customProps={props.customProps}
                // {...{
                //   onMousedown: (e: MouseEvent) =>
                //     focusHandler.block.onMousedown(e, block, index),
                //   onContextmenu: (e: MouseEvent) =>
                //     handler.onContextmenuBlock(e, block),
                // }}
              />
            ))
          )}
        </div>
      );
    };
  },
});

export default FormContent;