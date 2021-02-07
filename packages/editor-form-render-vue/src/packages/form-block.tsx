import { computed, defineComponent, onMounted, PropType, ref } from 'vue';
import { BlockData } from '../interfaces/model-value';
import {
  VisualEditorConfig
} from '../lib/utils';
import { ElButton, ElInput } from 'element-plus';

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
    }
  },
  setup(props) {
    const el = ref({} as HTMLDivElement);

    const classes = computed(() => [
      'visual-editor-block',
      {
        'visual-editor-block-focus': props.block.focus,
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
      const component = props.config.componentMap[props.block.componentKey];
      console.log({ componentKey: props.block.componentKey, config: props.config, component })
      if (!component) return (<div>123</div>);
      const Render = component.render();
      return (
        <div class={classes.value} style={style.value} ref={el}>
          {Render}
          <ElButton>按钮</ElButton>
          <ElInput/>
        </div>
      );
    };
  }
});
