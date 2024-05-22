
import { connect } from 'react-redux';
import Panel from './panel';
import { setQuakes } from '../../store/ducks/render';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    setRenderQuakes: (quakes) => dispatch(setQuakes(quakes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
