import "react-datepicker/dist/react-datepicker.css"

import './timeline.scss'
import DateButton from './dateButton'
import TimelineSlider from './timelineSlider'
import { useTimelineStore } from "@/store/timeline/timeline"

const DateSlider = () => {
  const {
    minRangeDate,
    maxRangeDate,
    setMinRangeDate,
    setMaxRangeDate
  } = useTimelineStore()

  return (
    <div className="timeline-container">
      <div className="timeline-date-start">
        <DateButton
          value={minRangeDate}
          onChange={(date) => setMinRangeDate(date)}
        />
      </div>
      <div className="timeline-slider" >
        <TimelineSlider />
      </div>
      <div className="timeline-date-end">
        <DateButton 
          value={maxRangeDate}
          onChange={(date) => setMaxRangeDate(date)}
        />
      </div>
    </div>
  )
}


export default DateSlider
