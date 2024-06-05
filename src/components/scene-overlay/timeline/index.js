import { connect } from "react-redux"

import { setEndDate, setStartDate } from "../../../store/quakes/quakes";

import Timeline from "./timeline";

const mapStateToProps = (state) => ({
    startDate: state.quakes.startDate,
    endDate: state.quakes.endDate,
})

const mapDispatchToProps = (dispatch) => ({
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
