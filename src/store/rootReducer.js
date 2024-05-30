import { configureStore } from '@reduxjs/toolkit';
import { quakesSlice } from './quakes/quakes';
import { renderSlice } from './render/render';

export default configureStore({
    reducer: {
        quakes: quakesSlice.reducer,
        render: renderSlice.reducer
    },
});
