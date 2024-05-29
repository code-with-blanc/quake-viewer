import { connect } from "react-redux"
import { setDateRange } from "../../store/controls/controls"

import Timeline from "./timeline";

const mapStateToProps = (state) => ({
    startDate: state.controls.startDate,
    endDate: state.controls.endDate,
})

const mapDispatchToProps = (dispatch) => ({
    setDateRange: (startDate, endDate) => dispatch(setDateRange(startDate, endDate)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
