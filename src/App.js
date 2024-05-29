import './App.css';
import Timeline from './components/timeline';
import Panel from './components/panel';
import Scene from './components/scene';

function App() {
  return (
    <div className="app">
      <div className='app-panel'>
        <Panel />
      </div>
      <div className='app-scene'>
        <Scene />
      </div>
      <Timeline />
    </div>
  );
}

export default App;
