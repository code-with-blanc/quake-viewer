import { useEffect } from "react";

import { useLayersStore } from "./store/layers/layers";
import "./App.scss";
import "./tailwind.css"
import { Page } from "./page/page";

function App() {
    document.documentElement.classList.add('dark')

    const { fetchLayers } = useLayersStore()

    useEffect(() => {
        fetchLayers()
    }, [fetchLayers]);
    
    return (
        <Page />
    );
}

export default App;
