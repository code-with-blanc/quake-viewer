import { configureStore } from '@reduxjs/toolkit';
import quakes from './ducks/quakes';

export default configureStore({
    reducer: {
        quakes: quakes
    }
});
