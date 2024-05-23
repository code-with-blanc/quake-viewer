import { configureStore } from '@reduxjs/toolkit';
import controls from './controls/controls';
import quakes from './quakes/quakes';

export default configureStore({
    reducer: {
        quakes: quakes,
        controls: controls,
    },
});
