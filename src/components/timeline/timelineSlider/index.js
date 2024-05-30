import { connect } from 'react-redux'

import { setRenderDateRange } from "../../../store/render/render";

import TimelineSlider from './timelineSlider'

const mapStateToProps = (state) => ({
    startDate: state.quakes.startDate,
    endDate: state.quakes.endDate,
    minRenderDate: state.render.minDate,
    maxRenderDate: state.render.maxDate,
})

const mapDispatchToProps = (dispatch) => ({
    setRenderDateRange: (minDate, maxDate) => dispatch(setRenderDateRange(minDate, maxDate))
})

export default connect(mapStateToProps, mapDispatchToProps)(TimelineSlider)
