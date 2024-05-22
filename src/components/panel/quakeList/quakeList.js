import { useGetQuakesQuery } from "../../../store/api/quakeApi";

import "./quakeList.scss";

const QuakeList = ({ quakes }) => {
    const queryResult = useGetQuakesQuery();
    return (
        <div className="quake-list-scrollable-container">
            <div className="quake-list-items-container">
                {(queryResult?.data || []).map(q => (<QuakeItem quake={q}/>))}
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

// terapia terça 10h
// abril - 2
// maio - 1
// 