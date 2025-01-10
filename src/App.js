import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchQuakes } from './store/quakes/quakes';

import Panel from './components/panel';
import Scene from './components/scene';

import './App.scss';
import './globalStyles.scss';
import SceneOverlay from './components/scene-overlay';
import SidePaneLayout from './components/scene/layout/sidePane/sidePane';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchQuakes())
  })

  return (
    <>
      <div className="app">
        <SidePaneLayout
          sidePaneContent={<Panel />}
          mainContent={
            <div className='app-scene-container'>
              <div className='app-scene'>
                <Scene />
              </div>
              <div className='app-scene-overlay'>
                <SceneOverlay />
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}

export default App;
