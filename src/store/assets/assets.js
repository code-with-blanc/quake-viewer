import axios from 'axios'

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

///// Action Creators

export const fetchWorld = createAsyncThunk(
    'assets/fetchWorld',
    async () => doFetchAsset(process.env.PUBLIC_URL + '/assets/georef-world-country.json')
)

//// Reducer
const initialState = {
    world: null,
}

export const assetsSlice = createSlice({
    name: 'assets',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchWorld.pending, (state) => {
            state.world = 'PENDING'
        })
        builder.addCase(fetchWorld.fulfilled, (state, action) => {
            state.world = action.payload || 'ERROR'
        })
        builder.addCase(fetchWorld.rejected, (state) => {
            state.world = 'ERROR'
        })
    }
})


//// Implementations

const doFetchAsset = async (url) => {
    try {
        const res = await axios.get(url)
        const data = await res.data
        return data
    } catch (e) {
        return null
    }
}
