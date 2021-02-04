import logo from './logo.svg';
import './App.css';
import a from '@atome/editor-form-render-vue'


function App() {
  setTimeout(() => {
    a.mount('vue-content')
    setTimeout(() => {
      a.app.unmount()
    }, 2000)
  }, 2000)

  return (
    <div className="App">
      <header className="App-header">
        React Wrap
        <img src={logo} className="App-logo" alt="logo" />
        <div className="vue-container">
          <p>2s后挂载vue组件</p>
          <p>再2s后销毁vue组件，😄</p>
          <div id="vue-content"></div>
        </div>
      </header>
    </div>
  );
}

export default App;
