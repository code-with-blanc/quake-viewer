import RangeSlider from 'react-range-slider-input'

import 'react-range-slider-input/dist/style.css'
import './timelineSlider.scss'
import { useTimelineStore } from '@/store/timeline/timeline'

const TimelineSlider = () => {  
    const {
      minRangeDate,
      maxRangeDate,
      startDate,
      endDate,
      setSelectedDateRange
   } = useTimelineStore()

    return (
      <RangeSlider
        className="timeline-slider-inner"
        min={minRangeDate.getTime()}
        max={maxRangeDate.getTime()}
        value={[startDate.getTime(), endDate.getTime()]}
        onInput={(param) => {
            setSelectedDateRange(new Date(param[0]), new Date(param[1]))
        }}
      />
    )
}

export default TimelineSlider
