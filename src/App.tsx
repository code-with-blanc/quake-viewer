import { useEffect } from "react"

import { useLayersStore } from "./store/layers/layers"
import { Page } from "./page/page"

import "./tailwind.css"
import "./App.scss"

function App() {
    document.documentElement.classList.add('dark')

    const { fetchLayers } = useLayersStore()

    useEffect(() => {
        fetchLayers()
    }, [fetchLayers])
    
    return (
        <Page />
    )
}

export default App;
