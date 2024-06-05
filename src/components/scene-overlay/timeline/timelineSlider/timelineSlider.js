import RangeSlider from 'react-range-slider-input'

import 'react-range-slider-input/dist/style.css'
import './timelineSlider.scss'

const TimelineSlider = ({
    startDate, endDate,
    minRenderDate, maxRenderDate,
    setRenderDateRange
  }) => {  
    return (
      <RangeSlider
        className="timeline-slider-inner"
        min={startDate}
        max={endDate}
        value={[minRenderDate, maxRenderDate]}
        onInput={(param) => {
            setRenderDateRange(param[0], param[1])
        }}
      />
    )
}

export default TimelineSlider
