import { configureStore } from '@reduxjs/toolkit';
import circles from './ducks/circles';

export default configureStore({
    reducer: {
        circles: circles
    }
});
