import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const quakeApi = createApi({
    reducerPath: 'quakesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://earthquake.usgs.gov/fdsnws/event/1/'
    }),
    endpoints: (builder) => ({
        getQuakes: builder.query({
            query: () => (`query?format=geojson`
                +`&starttime=2023-05-01`
                +`&endtime=2024-05-22`
                +`&minmagnitude=0`
                +`&minlatitude=62`
                +`&maxlatitude=70`
                +`&minlongitude=-25`
                +`&maxlongitude=-11`),
            transformResponse: (response, meta, arg) => {
                return response.features.map((feature) => ({
                    latitude: feature.geometry.coordinates[1],
                    longitude: feature.geometry.coordinates[0],
                    depth: feature.geometry.coordinates[2],
                    magnitude: feature.properties.mag,
                    place: feature.properties.place,
                    status: feature.properties.status,
                    time: feature.properties.time,
                }))
            },
            transformErrorResponse: (response, meta, arg) => {
                return []
            },  
        }),
        
    }),
})

export const { useGetQuakesQuery } = quakeApi;
