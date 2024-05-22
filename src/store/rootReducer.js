import { configureStore } from '@reduxjs/toolkit';
import { quakeApi } from './api/quakeApi';
import render from './ducks/render';

export default configureStore({
    reducer: {
        [quakeApi.reducerPath]: quakeApi.reducer,
        render: render,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(quakeApi.middleware)
});
