import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'

const TimelineSlider = ({
    startDate, endDate,
    minRenderDate, maxRenderDate,
    setRenderDateRange
  }) => {  
    return (
      <RangeSlider
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
