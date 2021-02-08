import { createApp, reactive } from 'vue'
import FormContent from './form-content'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import './styles/index.scss';
import { ModelValue } from './interfaces/model-value';

const vueEditForm: any = {
  mount: (elem: any, data: {
    modelValue: ModelValue,
    formData: Record<string, any>,
    customProps: Record<string, any>,
  }, forceUpdate = false) => {
    if (document.getElementById(elem)?.innerHTML) {
      console.log('this element has mounted!')
      if (forceUpdate) {
        console.log('this element forceUpdate!')
        vueEditForm[elem]?.unmount()
      } else {
        return
      }
    }
    const app = createApp(FormContent, data);
    vueEditForm[elem] = app
    app.use(ElementPlus);
    app.mount(`#${elem}`)
  },
  unmount: (elem: any) => {
    vueEditForm[elem]?.unmount()
  }
}
export default vueEditForm
