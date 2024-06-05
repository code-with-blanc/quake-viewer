import "react-datepicker/dist/react-datepicker.css"

import './timeline.scss'
import DateButton from './dateButton'
import TimelineSlider from './timelineSlider'

const DateSlider = ({
  startDate, endDate,
  setStartDate, setEndDate,
}) => {
  return (
    <div className="timeline-container">
      <div className="timeline-date-start">
        <DateButton
          value={startDate}
          onChange={(date) => setStartDate(date.getTime())}
        />
      </div>
      <div className="timeline-slider" >
        <TimelineSlider />
      </div>
      <div className="timeline-date-end">
        <DateButton 
          value={endDate}
          onChange={(date) => setEndDate(date.getTime())}
        />
      </div>
    </div>
  )
}


export default DateSlider
