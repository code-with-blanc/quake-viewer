import { connect } from "react-redux";

import QuakeRenderer from './quakeRenderer';

const mapStateToProps = (state) => ({
    quakes: state.render.quakes
});

export default connect(mapStateToProps, null)(QuakeRenderer);
