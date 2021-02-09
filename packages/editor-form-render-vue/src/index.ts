import { createApp } from 'vue'
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
    // data.formData._update = data.formData._update || vueEditForm.formDataChangeCb(elem)
    const app = createApp(FormContent, { ...data, formDataChangeCb });
    vueEditForm[elem] = app
    app.use(ElementPlus);
    app.mount(`#${elem}`)
    return app
  },
  unmount: (elem: any) => {
    vueEditForm[elem]?.unmount()
  },
  formDataChangeCb: (elem: any) => {
    return (formData: any) => {
      console.log('13221', vueEditForm[elem], formData, true)
      vueEditForm.mount(elem, { ...vueEditForm[elem]._props, formData }, {
        forceUpdate: true
      })
    }
  },
  // formDataChangeCb: (elem: any) => {
  //   return (formData: any) => {
  //     console.log('13221', vueEditForm[elem], formData, true)
  //     vueEditForm.mount(elem, {formData}, {
  //       forceUpdate: true
  //     })
  //   }
  // },
}
export default vueEditForm
