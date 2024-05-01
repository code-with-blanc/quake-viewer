import './App.css';
import Panel from './components/panel';
import Canvas from './components/canvas';

function App() {
  return (
    <div className="app">
      <div className='app-panel'>
        <Panel />
      </div>
      <div className='app-canvas'>
        <Canvas />
      </div>
    </div>
  );
}

export default App;
