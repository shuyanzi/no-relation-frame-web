import logo from './logo.svg';
import './App.css';
import vueForm from '@atome/editor-form-render-vue'
import '@atome/editor-form-render-vue/dist/index.css'
import jsonData from './data.json'
import jsonData2 from './data2.json'

function mountVue() {
  const formData = {
    name: 'admin',
    projectName: 'projectName',
    displayType: 'displayType',
    releaseTime: 'releaseTime',

  }
  vueForm?.mount('vue-content1', {
    modelValue: jsonData,
    formData,
    customProps: {
      submitButton: {
        onClick: () => {
          console.log('onClick', vueForm['vue-content1'], formData)
        },
      },
      mySelect: {
        onChange: (val) => {
          console.log('onChange')
        },
      },
      submitCancel: {
        onClick: (val) => {
          console.log('submitCancel')
        },
      },
    },
  }, true)
}
function mountVue2() {
  const formData = {
    name: 'admin',
    projectName: 'KP',
    displayType: 'ICON',
    releaseTime: 'releaseTime',
  }
  vueForm?.mount('vue-content2', {
    modelValue: jsonData2,
    formData,
    customProps: {
      submitButton: {
        onClick: () => {
          console.log('onClick', vueForm['vue-content2'], formData)
        },
      },
      mySelect: {
        onChange: (val) => {
          console.log('onChange')
        },
      },
      submitCancel: {
        onClick: (val) => {
          console.log('submitCancel')
        },
      },
    },
  }, true)
}
function unmountVue(id) {
  vueForm && vueForm[id]?.unmount()
}

function App() {

  return (
    <div className="App">
      <header className="App-header">
        React Wrap
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={mountVue}>挂载vue组件1</button>
        <button onClick={() => unmountVue('vue-content1')}>销毁vue组件1</button>
        <button onClick={mountVue2}>挂载vue组件2</button>
        <button onClick={() => unmountVue('vue-content2')}>销毁vue组件2</button>
      </header>
      <section className="vue-container">
        <div id="vue-content1"></div>
      </section>
      <section className="vue-container">
        <div id="vue-content2"></div>
      </section>
    </div>
  );
}

export default App;
