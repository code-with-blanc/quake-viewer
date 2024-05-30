import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { doFetchQuakes } from './fetchQuakes'

// Action Creators
export const fetchQuakes = createAsyncThunk(
    'quakes/fetchQuakes',
    async (_, thunkApi) => {
        const state = thunkApi.getState()
        return doFetchQuakes(
            state.quakes.startDate,
            state.quakes.endDate
        )
    }
)

export const setStartDate = (startDate) => (dispatch) => {
    dispatch({
        type: 'quakes/SET_START_DATE',
        payload: { startDate },
    })
    return dispatch(fetchQuakes())
}

export const setEndDate = (endDate) => (dispatch) => {
    dispatch({
        type: 'quakes/SET_END_DATE',
        payload: { endDate }
    })
    return dispatch(fetchQuakes())
}

// Reducer

const initialState = {
    quakes: [],
    isLoading: false,
    isError: false,

    startDate: Date.parse('2000-01-01 00:01'),
    endDate: Date.now(),
}

export const quakesSlice = createSlice({
    name: 'quakes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase('quakes/SET_START_DATE', (state, action) => {
            state.startDate = action.payload.startDate
        })
        builder.addCase('quakes/SET_END_DATE', (state, action) => {
            state.endDate = action.payload.endDate
        })
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

export default quakesSlice.reducer

// Selectors

export const selectQuakes = (state) => (state.quakes.quakes)

