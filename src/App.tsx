import { useEffect } from "react";

import Panel from "./components/panel/panel";
import Scene from "./scene/Scene";
import SceneOverlay from "./components/scene-overlay";
import SidePaneLayout from "./components/shared/layout/sidePane/sidePane";
import OverLayLayout from "./components/shared/layout/overlay/overlay";

import "./App.scss";
import { useLayersStore } from "./store/layers/layers";

function App() {
    const { fetchLayers } = useLayersStore()

    useEffect(() => {
        fetchLayers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <SidePaneLayout
            sidePaneContent={<Panel />}
            mainContent={
                <OverLayLayout
                    baseContent={<Scene />}
                    overlayContent={<SceneOverlay />}
                />
            }
        />
    );
}

export default App;
