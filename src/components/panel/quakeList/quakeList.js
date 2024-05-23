import "./quakeList.scss";

const QuakeList = ({ quakes }) => {
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
            <div className="quake-list-item-magnitude">{quake.magnitude}</div>
        </div>
    )
}

export default QuakeList;
