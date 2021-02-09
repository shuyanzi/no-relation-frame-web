import logo from './logo.svg';
import './App.css';
import vueForm from '@atome/editor-form-render-vue'
import '@atome/editor-form-render-vue/dist/index.css'
import jsonData from './data.json'
import jsonData2 from './data2.json'

let form1 = null, form2 = null
function mountVue() {
  const formData = {
    name: 'admin',
    projectName: 'projectName',
    displayType: 'displayType',
    releaseTime: 'releaseTime',

  }
  form1 = vueForm?.mount('vue-content1', {
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
  }, {
    forceUpdate: true
  })
}

// 两种卸载方式
function unmount1() {
  console.log('form1', form1)
  form1?.unmount()
}
function mountVue2() {
  const formData = {
    name: 'admin',
    projectName: 'KP',
    displayType: 'ICON',
    releaseTime: new Date(2016, 9, 10, 8, 40),
  }
  const modelValue = jsonData2;
  form2 = vueForm?.mount('vue-content2', {
    modelValue,
    formData,
    customProps: {
      submitButton: {
        onClick: () => {
          console.log('modelValue', modelValue)
          modelValue.container.height = '20px'
          formData.formRef.value.validate((valid) => {
            if (valid) {
              console.log('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          })
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
          form2.unmount()
        },
      },
    },
  }, {
    forceUpdate: true,
    formDataChangeCb: (key, { oldValue, newValue }) => {
      console.log('React receive form data from vue!')
      console.log({ formData, key, oldValue, newValue })
    }
  })
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
        <div className="operate">
          <button onClick={mountVue}>挂载vue组件1</button>
          <button onClick={() => unmount1()}>销毁vue组件1</button>
          <button onClick={mountVue2}>挂载vue组件2</button>
          <button onClick={() => unmountVue('vue-content2')}>销毁vue组件2</button>
        </div>
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
