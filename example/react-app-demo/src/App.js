import logo from './logo.svg';
import './App.css';
import vueForm from '@atome/editor-form-render-vue'
import '@atome/editor-form-render-vue/dist/index.css'
import jsonData from './data.json'

function mountVue() {
  vueForm?.mount('vue-content', jsonData)
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
        <div className="vue-container">
          <div id="vue-content"></div>
        </div>
      </header>
    </div>
  );
}

export default App;
