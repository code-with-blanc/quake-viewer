import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchQuakes } from './store/quakes/quakes';

import Panel from './components/panel';
import Scene from './components/scene';

import './App.css';
import SceneOverlay from './components/scene-overlay';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchQuakes())
  })

  return (
    <>
      <div className="app">
        <div className='app-panel'>
          <Panel />
        </div>
        <div className='app-scene-container'>
          <div className='app-scene'>
            <Scene />
          </div>
          <div className='app-scene-overlay'>
            <SceneOverlay />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
