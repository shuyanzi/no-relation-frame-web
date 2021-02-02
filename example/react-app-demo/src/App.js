import logo from './logo.svg';
import './App.css';
import a from '@atome/editor-form-render-vue'


function App() {
  setTimeout(() => {
    a.mountEle('vue-content')
  }, 2000)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div id="vue-content"></div>
      </header>
    </div>
  );
}

export default App;
