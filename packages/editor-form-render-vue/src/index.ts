import { createApp } from 'vue'
import FormContent from './form-content'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import './styles/index.scss';
import { ModelValue } from './interfaces/model-value';

const vueEditForm: any = {
  app: null,
  mount: (elem: any, data: {
    modelValue: ModelValue,
    formData: Record<string, any>,
    customProps: Record<string, any>,
  }) => {
    if (document.getElementById(elem)?.innerHTML) {
      console.log('this element has mounted!')
      return
    }
    console.log({ data })
    const app = createApp(FormContent, data);
    vueEditForm.app = app
    app.use(ElementPlus);
    app.mount(`#${elem}`)
  },
  unmount: () => {
    if (vueEditForm.app) {
      vueEditForm.app.unmount()
    }
  }
}
export default vueEditForm
