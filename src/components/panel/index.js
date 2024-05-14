
import { connect } from 'react-redux';
import { setNumQuakes } from '../../store/ducks/quakes';
import Panel from './panel';

const mapStateToProps = (state) => ({
    numQuakes: state.quakes.num_quakes,
});

const mapDispatchToProps = (dispatch) => ({
    setNumQuakes: (num_quakes) => dispatch(setNumQuakes(num_quakes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
