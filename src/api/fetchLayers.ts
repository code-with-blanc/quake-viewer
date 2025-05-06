import axios from "axios"
import { CountriesLayer } from "../store/layers/layers"

export const fetchWorld = async (): Promise<CountriesLayer | null> => {
    try {
        const res = await axios.get('./layers/georef-world-country.json')
        const data = await res.data

        return {
            layerId: 'countries',
            countries: data
        }
    } catch {
        return null
    }
}
