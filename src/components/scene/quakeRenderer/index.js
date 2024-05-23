import { connect } from "react-redux";

import QuakeRenderer from './quakeRenderer';
import { selectQuakes } from "../../../store/quakes/quakes";

const mapStateToProps = (state) => ({
    quakes: selectQuakes(state)
});

export default connect(mapStateToProps, null)(QuakeRenderer);
