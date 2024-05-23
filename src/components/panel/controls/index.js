import { connect } from "react-redux"
import Controls from "./controls"
import { setDateRange } from "../../../store/controls/controls"

const mapStateToProps = (state) => ({
    startDate: state.controls.startDate,
    endDate: state.controls.endDate,
})

const mapDispatchToProps = (dispatch) => ({
    setDateRange: (startDate, endDate) => dispatch(setDateRange(startDate, endDate)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
