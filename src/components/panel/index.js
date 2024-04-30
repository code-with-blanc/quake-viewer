
import { connect } from 'react-redux';
import { setCircles, setRadius } from '../../store/ducks/circles';
import Panel from './panel';

const mapStateToProps = (state) => ({
    circles: state.circles.circles,
    radius: state.circles.radius,
});

const mapDispatchToProps = (dispatch) => ({
    setCircles: (num_circles) => dispatch(setCircles(num_circles)),
    setRadius: (radius) => dispatch(setRadius(radius)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
