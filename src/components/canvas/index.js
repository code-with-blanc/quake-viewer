import { connect } from "react-redux";

import Canvas from './canvas';

const mapStateToProps = (state) => ({
    circles: state.circles.circles,
    radius: state.circles.radius,
});


export default connect(mapStateToProps, null)(Canvas);
