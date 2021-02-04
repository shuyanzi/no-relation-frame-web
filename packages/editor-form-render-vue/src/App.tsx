import { computed, defineComponent, PropType } from 'vue';

const Divider = defineComponent({
  name: 'ADivider',
  props: {
    prefixCls: String,
    type: {
      type: String as PropType<'horizontal' | 'vertical' | ''>,
      default: 'horizontal',
    },
    dashed: {
      type: Boolean,
      default: false,
    },
    orientation: {
      type: String as PropType<'left' | 'right' | 'center'>,
      default: 'center',
    },
  },
  setup(props, { slots }) {

    const classString = computed(() => {
      return {
        show: true,
      };
    });

    return () => {
      return (
        <div class={classString.value}>
          vue component 来了~~~~
        </div>
      );
    };
  },
});

export default Divider;