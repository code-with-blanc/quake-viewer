import { connect } from "react-redux";
import QuakeList from "./quakeList";

const mapStateToProps = (state) => ({
    quakes: state.quakes.quakes
})

export default connect(mapStateToProps, null)(QuakeList);
