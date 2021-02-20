import { defineComponent, PropType, ref } from 'vue';
import { ModelValue } from './interfaces/model-value';
import { FormBlock } from './packages/form-block';
import { visualConfig } from './lib/config';
import { useModel } from './lib/useModel';
import { Rules } from 'async-validator'

const FormContent = defineComponent({
  name: 'AFormContent',
  props: {
    elem: String,
    modelValue: {type: Object as PropType<ModelValue>, required: true},
    formData: { type: Object as PropType<Record<string, any>>, required: true },
    // 自定义事件
    customProps: { type: Object as PropType<Record<string, any>> },
    formDataChangeCb: { type: Function, required: true },
    modelValueEvent: {type: Object, required: true},
  },
  setup(props, ctx) {
    const { modelValue, formData, customProps, formDataChangeCb, modelValueEvent, elem } = props
    const dataModel = useModel(() => modelValue, val => {})
    formData['formRef'] = ref();
    const data = ref(formData);
    // form表单校验规则
    const rules: Rules = {}
    // 监听 model value的修改
    modelValueEvent.$on(`${elem}:update-model-value`, (val: ModelValue) => {
      console.log('event update-model-value:', val)
      dataModel.value = val
    })

    dataModel.value.blocks.forEach((block) => {
      const modelName = !block?.model ? null : block?.model.modelValue || block?.model.default || null;
      const rule = !block?.rules ? null : block?.rules;
      if (modelName && rule) {
        rules[modelName] = JSON.parse(JSON.stringify(rule))
      }
    })

    return () => {
      return (
        <div class='form-container' style={{
          // width: `${dataModel.value.container.width}px`,
          // height: `${dataModel.value.container.height}px`
        }}>
          vue component 来了~~~~
          {!!dataModel.value.blocks && (
            <el-form model={data.value} rules={rules} ref={formData['formRef']} label-width="100px" class="demo-ruleForm">
              {
                dataModel.value.blocks.map((block, index) => (
                  <FormBlock
                    block={block}
                    key={`${block.model && (block.model.modelValue || block.model.default || new Date().getTime())}-${index}`}
                    config={visualConfig}
                    formData={data.value}
                    slots={ctx.slots}
                    customProps={customProps}
                    formDataChangeCb={formDataChangeCb}
                    // {...{
                    //   onMousedown: (e: MouseEvent) =>
                    //     focusHandler.block.onMousedown(e, block, index),
                    //   onContextmenu: (e: MouseEvent) =>
                    //     handler.onContextmenuBlock(e, block),
                    // }}
                  />
                ))
              }
            </el-form>
          )}
        </div>
      );
    };
  },
});

export default FormContent;