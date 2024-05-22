import { connect } from "react-redux";
import QuakeList from "./quakeList";

const mapStateToProps = (state) => (
    state.quakesApi
)

export default connect(mapStateToProps, null)(QuakeList);
