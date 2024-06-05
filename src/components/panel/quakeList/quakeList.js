import { useSelector } from "react-redux";
import "./quakeList.scss";
import { selectQuakes, selectQuakesStatus } from "../../../store/quakes/quakes";

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
    const date = new Date(quake.time)
    
    return (
        <div className="quake-list-item">
            <div className="quake-list-item-location">{quake.place}</div>
            <div className="quake-list-item-date">{ date.toLocaleString() }</div>
            <div className="quake-list-item-magnitude">{Number(quake.magnitude).toFixed(1)}</div>
        </div>
    )
}

export default QuakeList;
