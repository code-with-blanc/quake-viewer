import { configureStore } from '@reduxjs/toolkit';
import { quakesSlice } from './quakes/quakes';
import { renderSlice } from './render/render';
import { assetsSlice } from './assets/assets';

export default configureStore({
    reducer: {
        quakes: quakesSlice.reducer,
        render: renderSlice.reducer,
        assets: assetsSlice.reducer,
    },
});
