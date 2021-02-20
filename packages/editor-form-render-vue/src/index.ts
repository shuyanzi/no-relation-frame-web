import { createApp } from 'vue'
import FormContent from './form-content'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import './styles/index.scss';
import { ModelValue } from './interfaces/model-value';
import { EventEmitter } from './lib/event-emitter';
export { createNewBlock } from './lib/utils';
export { visualConfig } from './lib/config';
export { FormBlock } from './packages/form-block';

const vueEditForm: any = {
  mount: (elem: any, data: {
    modelValue: ModelValue,
    formData: Record<string, any>,
    customProps: Record<string, any>,
  }, {
    forceUpdate = false,
    formDataChangeCb = (key: string, { oldValue, newValue }) => {
      console.log('in Vue: form data changed!')
      console.log({ key, oldValue, newValue })
    }
  }) => {
    if (document.getElementById(elem)?.innerHTML) {
      console.log('this element has mounted!', forceUpdate)
      if (forceUpdate) {
        console.log('this element forceUpdate!')
        vueEditForm[elem]?.unmount()
      } else {
        return
      }
    }
    const event = new EventEmitter()

    const app = createApp(FormContent, { ...data, formDataChangeCb, elem, modelValueEvent: event });
    vueEditForm[elem] = app
    app.use(ElementPlus);
    app.mount(`#${elem}`)
    return { ...app, modelValueEvent: event }
  },
  unmount: (elem: any) => {
    vueEditForm[elem]?.unmount()
  },
}
export default vueEditForm

