import { useSelector } from "react-redux";
import { selectQuakes, selectQuakesStatus } from "../../../store/quakes/quakes";
import { useState } from "react";

import "./quakeList.scss";
import FeatherIcon from "feather-icons-react";

const QuakeList = () => {
    const quakesStatus = useSelector(selectQuakesStatus)
    const quakes = useSelector(selectQuakes)

    if (quakesStatus.isError) {
        return (
            <div className="quake-list quake-list-error flex-center">
                <div className="text-lg">Error Loading Earthquakes</div>
                <div className="text-sm">Try reloading this page</div>
            </div>
        )
    }

    if (quakesStatus.isLoading) {
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
    
    return (
        <>
            <div className="quake-list-item" onClick={() => setOpen(!open)}>
                <div className="quake-list-item-location">{quake.place}</div>
                <div className="quake-list-item-date">{date.toLocaleString()}</div>
                <div className="quake-list-item-magnitude">{Number(quake.magnitude).toFixed(1)}</div>
                
                {open ? (
                    <div className="quake-list-item-details">
                        <div className="quake-list-item-details-lat">Lat: {Number(quake.latitude).toFixed(2)}</div>
                        <div className="quake-list-item-details-long">Long: {Number(quake.longitude).toFixed(2)}</div>
                        <div className="quake-list-item-details-depth">Depth: {quake.depth} km</div>
                        <div className="quake-list-item-details-link">
                            <a href={quake.url} rel="noreferrer" target="_blank">USGS Catalogue</a>
                            <FeatherIcon icon="external-link" size={14} />
                        </div>
                    </div>
                ) : null}
            </div>
            <div className="quake-list-item-separator" />
        </>

)
}

export default QuakeList;
