import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    minDate: 0,
    maxDate: Number.MAX_VALUE,
}

export const renderSlice = createSlice({
    name: 'render',
    initialState,
    reducers: (create) => ({
        setMinRenderDate: create.reducer((state, action) => {
            state.minDate = action.payload
        }),
        setMaxRenderDate: create.reducer((state, action) => {
            state.maxDate = action.payload
        }),
        setRenderDateRange: create.preparedReducer(
            (minDate, maxDate) => ({
                payload: { minDate, maxDate }
            }),
            (state, action) => {
                state.minDate = action.payload.minDate
                state.maxDate = action.payload.maxDate
            }
        ),
    })
})

export const {
    setMinRenderDate,
    setMaxRenderDate,
    setRenderDateRange,
} = renderSlice.actions
