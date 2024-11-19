import { useSelector } from "react-redux";
import "./quakeList.scss";
import { selectQuakes, selectQuakesStatus } from "../../../store/quakes/quakes";
import { useState } from "react";

const QuakeList = () => {
    const quakesStatus = useSelector(selectQuakesStatus)
    const quakes = useSelector(selectQuakes)

    if (quakesStatus.isError) {
        return (
            <div className="quake-list-text-container">
                <div>Error Loading Earthquakes</div>
                <div className="quake-list-text-small">Try reloading this page</div>
            </div>
        )
    }

    if (quakesStatus.isLoading) {
        return (
            <div className="quake-list-text-container">
                <div>Loading Earthquakes</div>
                <div className="quake-list-loading-dots" />
            </div>
        )
    }

    return (
        <div className="quake-list-scrollable-container">
            <div className="quake-list-items-container">
                {(quakes).map(q => (<QuakeItem key={q.id} quake={q}/>))}
            </div>
        </div>
    )
}

const QuakeItem = ({ quake }) => {
    const [open, setOpen] = useState(false)

    const date = new Date(quake.time)
    
    return (
        <div className="quake-list-item" onClick={() => setOpen(!open)}>
            <div className="quake-list-item-location">{quake.place}</div>
            <div className="quake-list-item-date">{date.toLocaleString()}</div>
            <div className="quake-list-item-magnitude">{Number(quake.magnitude).toFixed(1)}</div>

            { open ? (            
                <div className="quake-list-item-extras">
                    <div>Lat: {quake.latitude}</div>
                    <div>Long: {quake.longitude}</div>
                    <div>Depth: {quake.depth}</div>
                </div>
            ): null }
        </div>
    )
}

export default QuakeList;
