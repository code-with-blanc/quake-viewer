import { createSlice } from '@reduxjs/toolkit'

import { fetchQuakes } from './fetchQuakesThunk'

const initialState = {
    quakes: [],
    isLoading: false,
    isError: false,
}

export { fetchQuakes };

export const contentSlice = createSlice({
    name: 'quakes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchQuakes.pending, (state) => {
            state.isLoading = true
            state.isError = false
            state.errorMessage = null
        })
        builder.addCase(fetchQuakes.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.errorMessage = null
            state.quakes = action.payload
        })
        builder.addCase(fetchQuakes.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.errorMessage = action.error.message
            state.quakes = []
        })
    },
})

export default contentSlice.reducer

export const selectQuakes = (state) => (state.quakes.quakes)

