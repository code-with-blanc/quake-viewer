import { lightFormat } from "date-fns"
import axios from 'axios'
import { Quake } from "../model/quake"
import { TimeRange } from "@/model/timeRange"


export type QuakeRequestSpec = { timeRange: TimeRange, placement: 'before' | 'after' }

export class QuakeFetcher {
    static readonly baseUrl = 'https://earthquake.usgs.gov/fdsnws/event/1'
    static readonly req_max_time = 30 * 24 * 60 * 60 * 1000  // 1mo

    static createRequests(currentTime: TimeRange, requestedTime: TimeRange): QuakeRequestSpec[] {
        const requests = [] as QuakeRequestSpec[]

        for(let t = currentTime.max; t < requestedTime.max; t += this.req_max_time) {
            const nextTimeWindowEnd = t + this.req_max_time
            const endTime = (nextTimeWindowEnd > requestedTime.max) ? requestedTime.max : nextTimeWindowEnd
            
            requests.push({
                placement: 'before',
                timeRange: { min: t, max: endTime }
            })
        }

        for(let t = currentTime.min; t > requestedTime.min; t -= this.req_max_time) {
            const nextTimeWindowStart = t - this.req_max_time
            const startTime = (nextTimeWindowStart < requestedTime.min) ? requestedTime.min : nextTimeWindowStart
            
            requests.push({
                placement: 'before',
                timeRange: { min: startTime, max: t }
            })
        }

        return requests
    }

    static async fetchQuakes(spec: QuakeRequestSpec): Promise<Quake[]> {
        const { min: startDate, max: endDate } = spec.timeRange

        const startDateStr = lightFormat(startDate, 'yyyy-MM-dd')
        const endDateStr = lightFormat(endDate, 'yyyy-MM-dd')

        const res = await axios.get(
            `${this.baseUrl}/query?format=geojson`
            + `&starttime=${startDateStr}`
            + `&endtime=${endDateStr}`
            + `&minmagnitude=0`
        )

        return res.data.features.map(f => this.mapFeatureToQuake(f))
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static mapFeatureToQuake(feature: any): Quake {
        return {
            id: feature.properties.code,
            latitude: feature.geometry.coordinates[1],
            longitude: feature.geometry.coordinates[0],
            depth: feature.geometry.coordinates[2],
            magnitude: feature.properties.mag,
            place: feature.properties.place,
            status: feature.properties.status,
            time: new Date(feature.properties.time).getTime(),
            url: feature.properties.url,
        }
    }
}
