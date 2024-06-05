import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doFetchIceland } from "./fetchIceland";

///// Action Creators
export const fetchIcelandCoordinates = createAsyncThunk(
    'render/fetchIcelandCoordinates',
    async () => { return doFetchIceland() }
)

//// Reducer
const initialState = {
    minDate: 0,
    maxDate: Number.MAX_VALUE,
    icelandCoordinates: []
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
    }),
    extraReducers: (builder) => {
        builder.addCase(fetchIcelandCoordinates.pending, (state) => {
            state.icelandCoordinates = []
        })
        builder.addCase(fetchIcelandCoordinates.fulfilled, (state, action) => {
            state.icelandCoordinates = action.payload
        })
        builder.addCase(fetchIcelandCoordinates.rejected, (state) => {
            state.icelandCoordinates = []
        })
    }
})

export const {
    setMinRenderDate,
    setMaxRenderDate,
    setRenderDateRange,
} = renderSlice.actions
