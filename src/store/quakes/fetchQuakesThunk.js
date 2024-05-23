import { createAsyncThunk } from '@reduxjs/toolkit'
import { lightFormat, toDate } from "date-fns"
import axios from 'axios'

import { selectDateRange } from '../controls/controls'

const baseUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/'

export const fetchQuakes = createAsyncThunk(
    'quakes/fetchQuakes',
    async (arg, thunkApi) => {
        const { startDate, endDate } = selectDateRange(thunkApi.getState())
        const res = await axios(`${baseUrl}${buildQueryArgs(startDate, endDate)}`)
        const data = await res.data
        return transformApiResponse(data)
    }
)

/// Utility fns
const transformApiResponse = (response) => (
    response.features.map((feature) => ({
        id: feature.properties.code,
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
        depth: feature.geometry.coordinates[2],
        magnitude: feature.properties.mag,
        place: feature.properties.place,
        status: feature.properties.status,
        time: feature.properties.time,
    }))
)

const buildQueryArgs = (startDate, endDate) => {
    if (!startDate) {
        startDate = toDate(startDate || '2000-01-01')
    }
    if (!endDate) {
        endDate = toDate(endDate || Date.now())
    }
    const startDateStr = lightFormat(startDate, 'yyyy-MM-dd')
    const endDateStr = lightFormat(endDate, 'yyyy-MM-dd')

    return (
        `query?format=geojson`
        + `&starttime=${startDateStr}`
        + `&endtime=${endDateStr}`
        + `&minmagnitude=0`
        + `&minlatitude=62`
        + `&maxlatitude=70`
        + `&minlongitude=-25`
        + `&maxlongitude=-11`
    )
}
