import RangeSlider from 'react-range-slider-input'

import 'react-range-slider-input/dist/style.css'
import './timeline.scss'
import { useQuakes } from '@/store/quakes/quakes'

export const Timeline: React.FC = () => {
    const {
        timeRange,
        visibleTimeRange,
        setVisibleTimeRange
    } = useQuakes()

    return (
        <div className="timeline-container">
            <RangeSlider
                className="range-slider"
                min={timeRange.min}
                max={timeRange.max}
                value={[visibleTimeRange.min, visibleTimeRange.max]}
                onInput={(range) => {
                    setVisibleTimeRange(range[0], range[1])
                }}
            />
        </div>
    )
}
