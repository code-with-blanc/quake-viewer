import { useState } from "react";

import { ExternalLink } from 'lucide-react'
import { useQuakes } from "@/store/quakes/quakes";

import "./quakeList.scss";

export const QuakeList = () => {
    const { quakes, state } = useQuakes()

    if (state === 'ERROR') {
        return (
            <div className="quake-list quake-list-error flex-center">
                <div className="text-lg">Error Loading Earthquakes</div>
                <div className="text-sm">Try reloading this page</div>
            </div>
        )
    }

    if (state === 'LOADING') {
        return (
            <div className="quake-list quake-list-loading flex-center">
                <div className="text-lg">Loading<br/>Earthquakes</div>
                <div className="animation-loading-dots" />
            </div>
        )
    }

    return (
        <div className="quake-list quake-list-scrollable-container">
            <div className="quake-list-items-container">
                {(quakes).slice(0, 100).map(q => (<QuakeItem key={q.id} quake={q}/>))}
            </div>
        </div>
    )
}

const QuakeItem = ({ quake }) => {
    const [open, setOpen] = useState(false)

    const date = new Date(quake.time)
    
    const lat = Number(Math.abs(quake.latitude)).toFixed(2)  + ' ' + ((quake.latitude > 0) ? 'N' : 'S')
    const lon = Number(Math.abs(quake.longitude)).toFixed(2) + ' ' + ((quake.longitude > 0) ? 'E' : 'W')

    return (
        <>
            <div className="quake-list-item" onClick={() => setOpen(!open)}>
                <div className="quake-list-item-location">{quake.place}</div>
                <div className="quake-list-item-date">{date.toLocaleString()}</div>
                <div className="quake-list-item-magnitude">{Number(quake.magnitude).toFixed(1)}</div>
                
                {open ? (
                    <div className="quake-list-item-details">
                        <div className="quake-list-item-details-lat">Lat: {lat}</div>
                        <div className="quake-list-item-details-long">Long: {lon}</div>
                        <div className="quake-list-item-details-depth">Depth: {Number(quake.depth).toFixed(1)} km</div>
                        <div className="quake-list-item-details-link">
                            <a href={quake.url} rel="noreferrer" target="_blank">USGS Catalogue</a>
                            <ExternalLink size={14} />
                        </div>
                    </div>
                ) : null}
            </div>
            <div className="quake-list-item-separator" />
        </>

)
}
