import { useEffect } from "react"

import { Page } from "./page/page"

import "./tailwind.css"
import "./App.scss"
import { useQuakes } from "./store/quakes/quakes"
import { useLayers } from "./store/layers/layers"

function App() {
    useEffect(() => {
        useLayers.getState().fetchLayers()
        useQuakes.getState().fetchInitialQuakes()
    }, [])

    document.documentElement.classList.add('dark')
    return (
        <Page />
    )
}

export default App;
