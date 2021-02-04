import { computed, defineComponent, PropType } from 'vue';
import { ModelValue } from './interfaces/model-value';
// import { BlockData, ModelValue } from './interfaces/model-value';
// import { VisualEditorConfig } from './lib/utils';
import { FormBlock } from './packages/form-block';
import { visualConfig } from './lib/config';

const FormContent = defineComponent({
  name: 'AFormContent',
  props: {
    modelValue: {type: Object as PropType<ModelValue>, required: true},
    // config: {type: Object as PropType<VisualEditorConfig>, required: true},
  },
  setup(props, { slots }) {
    const { modelValue } = props
    const containerStyles = computed(() => ({
      width: `${modelValue.container.width}px`,
      height: `${modelValue.container.height}px`,
    }))
    console.log({ modelValue })

    const classString = computed(() => {
      return {
        show: true,
      };
    });

    return () => {
      return (
        <div class={classString.value} style={containerStyles.value}>
          vue component 来了~~~~
          {!!modelValue.blocks && (
            modelValue.blocks.map((block, index) => (
              <FormBlock
                config={visualConfig}
                block={block}
                key={index}
                // {...{
                //     onMousedown: (e: MouseEvent) => focusHandler.block.onMousedown(e, block)
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