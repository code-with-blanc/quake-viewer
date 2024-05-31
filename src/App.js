import './App.css';
import Timeline from './components/timeline';
import Panel from './components/panel';
import Scene from './components/scene';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchQuakes } from './store/quakes/quakes';
import InfoBar from './components/infoBar';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchQuakes())
  })

  return (
    <>
      <div className='app-info-bar'>
        <InfoBar />
      </div>
      <div className="app">
        <div className='app-panel'>
          <Panel />
        </div>
        <div className='app-scene'>
          <Scene />
          <Timeline />
        </div>
      </div>
    </>
  );
}

export default App;
