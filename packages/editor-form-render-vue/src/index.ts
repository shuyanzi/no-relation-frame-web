import { createApp } from 'vue'
import FormContent from './form-content'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
// import './styles/index.scss';
// import { ModelValue } from './interfaces/model-value';

const vueEditForm: any = {
  app: null,
  // mount: (elem: any, modelValue: ModelValue) => {
  mount: (elem: any, modelValue: any) => {
    if (document.getElementById(elem)?.innerHTML) {
      return
    }
    const app = createApp(FormContent, { modelValue });
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
