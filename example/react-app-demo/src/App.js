import logo from './logo.svg';
import './App.css';
import vueForm from '@atome/editor-form-render-vue'
import '@atome/editor-form-render-vue/dist/index.css'
import jsonData from './data.json'

function mountVue() {
  vueForm?.mount('vue-content', {
    modelValue: jsonData,
    formData: {
      username: 'admin',
    },
    customProps: {
      // subBtn是组件标识
      submitButton: {
        onClick: () => {
          console.log('onClick')
          // this.$notify({ message: "执行表单数据校验及提交服务器的动作" });
        },
      },
      mySelect: {
        onChange: (val) => {
          console.log('onChange')
          // this.$notify({ message: `食物发生变化: ${val}` });
        },
      },
    },
  })
}
function unmountVue() {
  vueForm?.app?.unmount()
}
function App() {

  return (
    <div className="App">
      <header className="App-header">
        React Wrap
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={mountVue}>挂载vue组件</button>
        <button onClick={unmountVue}>销毁vue组件</button>
      </header>
      <section className="vue-container">
        <div id="vue-content"></div>
      </section>
    </div>
  );
}

export default App;
