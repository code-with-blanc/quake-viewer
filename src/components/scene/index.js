import { connect } from "react-redux";

import Scene from './Scene';

const mapStateToProps = (state) => ({
    circles: state.circles.circles,
    radius: state.circles.radius,
});


export default connect(mapStateToProps, null)(Scene);
