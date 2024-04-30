import './App.css';
import Panel from './components/panel';

function App() {
  return (
    <div className="app">
      <div className='app-panel'>
        <Panel />
      </div>
      <div className='app-canvas'>
      </div>
    </div>
  );
}

export default App;
