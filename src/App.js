import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchQuakes } from "./store/quakes/quakes";

import Panel from "./components/panel";
import Scene from "./scene";

import "./globalStyles.scss";
import SceneOverlay from "./components/scene-overlay";
import SidePaneLayout from "./components/shared/layout/sidePane/sidePane";
import OverLayLayout from "./components/shared/layout/overlay/overlay";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchQuakes());
    });

    return (
        <>
            <div style={{ width: '100vw', height: '100vh', overflow: 'hidden'}}>
                <SidePaneLayout
                    sidePaneContent={<Panel />}
                    mainContent={
                        <OverLayLayout
                            baseContent={<Scene />}
                            overlayContent={<SceneOverlay />}
                        />
                    }
                />
            </div>
        </>
    );
}

export default App;
