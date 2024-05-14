import { connect } from "react-redux";

import QuakeRenderer from './QuakeRenderer';

const mapStateToProps = (state) => ({
    quakes: state.quakes.quakes
});


export default connect(mapStateToProps, null)(QuakeRenderer);
