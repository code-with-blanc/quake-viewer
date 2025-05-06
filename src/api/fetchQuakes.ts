import { lightFormat, toDate } from "date-fns"
import axios from 'axios'
import { Quake } from "../model/quake"

const baseUrl = 'https://earthquake.usgs.gov/fdsnws/event/1'

export async function fetchQuakes(startDate: Date | string, endDate: Date | string): Promise<Quake[]> {
    if (!startDate) {
        startDate = toDate(startDate || '2000-01-01')
    }
    if (!endDate) {
        endDate = toDate(endDate || Date.now())
    }
    const startDateStr = lightFormat(startDate, 'yyyy-MM-dd')
    const endDateStr = lightFormat(endDate, 'yyyy-MM-dd')

    const res = await axios.get(
        `${baseUrl}/query?format=geojson`
        + `&starttime=${startDateStr}`
        + `&endtime=${endDateStr}`
        + `&minmagnitude=0`
    )

    return res.data.features.map(f => mapFeatureToQuake(f))
}

const mapFeatureToQuake = (feature: any): Quake => {
    return {
        id: feature.properties.code,
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
        depth: feature.geometry.coordinates[2],
        magnitude: feature.properties.mag,
        place: feature.properties.place,
        status: feature.properties.status,
        time: feature.properties.time,
        url: feature.properties.url,
    }
}
