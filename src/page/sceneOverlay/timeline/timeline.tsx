import { useTimelineStore } from "@/store/timeline/timeline"
import RangeSlider from 'react-range-slider-input'

import 'react-range-slider-input/dist/style.css'
import './timeline.scss'

export const Timeline: React.FC = () => {
    const {
      minRangeDate,
      maxRangeDate,
      startDate,
      endDate,
      setSelectedDateRange
   } = useTimelineStore()

  return (
    <div className="timeline-container">
      <RangeSlider
        className="range-slider"
        min={minRangeDate.getTime()}
        max={maxRangeDate.getTime()}
        value={[startDate.getTime(), endDate.getTime()]}
        onInput={(param) => {
            setSelectedDateRange(new Date(param[0]), new Date(param[1]))
        }}
      />
    </div>
  )
}
