import { createApp } from 'vue'
import App from './App'

// const app = createApp(App);
// app.use(ElementPlus);
// app.mount('#app')



const aa: any = {
  app: null,
  mount: (elem: any) => {
    if (document.getElementById(elem)?.innerHTML) {
      return
    }
    const app = createApp(App);
    aa.app = app
    // // window.vue = app
    // // app.use(ElementPlus);
    app.mount(`#${elem}`)
  },
  unmount: () => {
    if (aa.app) {
      aa.app.unmount()
    }
  }
}
export default aa
