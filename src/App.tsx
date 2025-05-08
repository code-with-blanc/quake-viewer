import { useEffect } from "react";

import Panel from "./components/panel/panel";
import Scene from "./scene/Scene";
import SceneOverlay from "./components/scene-overlay";
import SidePaneLayout from "./components/shared/layout/sidePane/sidePane";
import OverLayLayout from "./components/shared/layout/overlay/overlay";

import { useLayersStore } from "./store/layers/layers";
import "./App.scss";
import "./tailwind.css"

function App() {
    document.documentElement.classList.add('dark')

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
